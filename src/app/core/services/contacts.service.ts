import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Contact} from '../../store/models/contact';
import {Store} from '../../store/store';
import * as _ from 'lodash';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ActivatedRouteSnapshot, Router, RouterModule} from '@angular/router';
import {ContactsPageService} from '../../contacts-page/contacts-page.service';

@Injectable()
export class ContactsService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private store: Store, private route: ActivatedRoute) {
  }

  getAll() {
    return this.http.get<Contact[]>(`${this.apiUrl}api/contacts`);
  }

  getOne(id: number) {
    return this.http.get<Contact>(`${this.apiUrl}api/contacts/${id}`);
  }

  addOne(contact: Contact) {
    return this.http.post<Contact>(`${this.apiUrl}api/contacts`, contact)
      .do(_contact => {
        this.store.state.contacts.push(_contact);
        this.store.setContacts(_.sortBy(this.store.state.contacts, 'name'));
      });
  }

  updateOne(contact: Contact) {
    return this.http.put<Contact>(`${this.apiUrl}api/contacts/${contact.id}`, contact)
      .do(_contact => {
        _.merge(_.find(this.store.state.contacts, {id: contact.id}), contact);
        this.store.setContacts(_.sortBy(this.store.state.contacts, 'name'));
      });
  }

  deleteOne(id: number) {
    return this.http.delete<Contact>(`${this.apiUrl}api/contacts/${id}`)
      .do(() => {
        const index = _.findIndex(this.store.state.contacts, {id: id});
        this.store.state.contacts.splice(index, 1);
        this.store.publishContacts();
      });
  }

  updateMany(contacts: Contact[]) {
    return this.http.put<Contact>(`${this.apiUrl}api/contacts`, contacts);
  }

  deleteAllWithLabel(labelId) {

    const contacts = this.store.state.contacts;
    const deleteContacts = [];
    contacts.forEach(contact => {
      if (_.find(contact.labels, {id: labelId})) {
        deleteContacts.push(contact);
      }
    });

    deleteContacts.forEach(contact => {
      contacts.splice(_.findIndex(contacts, {id: contact.id}), 1);
    })

    const params = new HttpParams().set('label', labelId);
    return this.http.delete<any>(`${this.apiUrl}api/contacts`, {params: params})
      .do(() => this.store.publishContacts());
  }

  updateLabelInContacts(contacts: Contact[], label) {
    const updateContacts: Contact[] = [];

    contacts.forEach(contact => {
      const index = _.findIndex(contact.labels, {id: label.id})
      if (index !== -1) {
        contact.labels[index].name = label.name;
        updateContacts.push(contact);
      }
    });
    if (updateContacts.length > 0) {
      return this.updateMany(updateContacts)
        .do(() => this.store.publishContacts());
    } else {
      return Observable.of(null);
    }
  }

  removeLabelFromContacts(contacts: Contact[], labelId) {
    const updateContacts: Contact[] = [];

    contacts.forEach(contact => {
      const index = _.findIndex(contact.labels, {id: labelId})
      if (index !== -1) {
        contact.labels.splice(index, 1);
        updateContacts.push(contact);
      }
    });
    if (updateContacts.length > 0) {
      return this.updateMany(updateContacts)
        .do(resp => this.store.publishContacts());
    } else {
      return Observable.of(null);
    }
  }

  hasLabel(contact, labelId) {
    return !!_.find(contact.labels, {id: labelId});
  }

  toggleLabel(contact, label) {
    const labels = contact.labels;
    const index = _.findIndex(labels, {id: label.id});
    if (index !== -1) {
      labels.splice(index, 1);
    } else {
      labels.push(label);
      _.sortBy(labels, 'name');
    }
  }

  removeLabelFromContact(contact, label) {
    const labels = contact.labels;
    const index = _.findIndex(labels, {id: label.id});
    labels.splice(index, 1);
    return this.updateOne(contact)
      .do(contact => {
        this.store.publishContacts();
      });
  }

}
