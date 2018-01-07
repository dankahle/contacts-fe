import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Contact} from '../../store/models/contact';
import {Store} from '../../store/store';
import * as _ from 'lodash';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ActivatedRouteSnapshot, Router, RouterModule} from '@angular/router';
import {ContactsPageService} from '../../contacts-page/contacts-page.service';
import {StoreContacts} from '../../store/store-contacts';

@Injectable()
export class ContactsService {
  apiUrl = environment.apiUrl;
  con: StoreContacts;

  constructor(private http: HttpClient, private store: Store, private route: ActivatedRoute) {
    this.con = store.con;
  }

  getAll() {
    return this.http.get<Contact[]>(`${this.apiUrl}api/contacts`)
      .map(contacts => _.sortBy(contacts, this.sortByNameOrCompany));
  }

  getOne(id: number) {
    return this.http.get<Contact>(`${this.apiUrl}api/contacts/${id}`);
  }

  addOne(contact: Contact) {
    return this.http.post<Contact>(`${this.apiUrl}api/contacts`, contact)
      .do(_contact => {
        this.con.contacts.push(_contact);
        this.con.pubContacts(_.sortBy(this.con.contacts, this.sortByNameOrCompany));
      });
  }

  updateOne(contact: Contact) {
    const params = new HttpParams().set('delay', '1000');
    return this.http.put<Contact>(`${this.apiUrl}api/contacts/${contact.id}`, contact, {params})
      .do(_contact => {
        const userContact = _.find(this.con.contacts, {id: contact.id});
        _.merge(userContact, _contact);
        this.con.pubContacts(_.sortBy(this.con.contacts, this.sortByNameOrCompany));
      });
  }

  deleteOne(id: number) {
    return this.http.delete<Contact>(`${this.apiUrl}api/contacts/${id}`)
      .do(() => {
        const index = _.findIndex(this.con.contacts, {id: id});
        this.con.contacts.splice(index, 1);
        this.con.pubContacts(this.con.contacts);
      });
  }

  updateMany(contacts: Contact[]) {
    return this.http.put<Contact>(`${this.apiUrl}api/contacts`, contacts);
  }

  deleteAllWithLabel(labelId) {

    const contacts = this.con.contacts;
    const deleteContacts = [];
    contacts.forEach(contact => {
      if (_.find(contact.labels, {id: labelId})) {
        deleteContacts.push(contact);
      }
    });

    deleteContacts.forEach(contact => {
      contacts.splice(_.findIndex(contacts, {id: contact.id}), 1);
    });

    const params = new HttpParams().set('label', labelId);
    return this.http.delete<any>(`${this.apiUrl}api/contacts`, {params: params})
      .do(() => this.con.pubContacts(this.con.contacts));
  }

  updateLabelInContacts(contacts: Contact[], label) {
    const updateContacts: Contact[] = [];

    contacts.forEach(contact => {
      const index = _.findIndex(contact.labels, {id: label.id});
      if (index !== -1) {
        contact.labels[index].name = label.name;
        updateContacts.push(contact);
      }
    });
    if (updateContacts.length > 0) {
      return this.updateMany(updateContacts)
        .do(() => this.con.pubContacts(this.con.contacts));
    } else {
      return Observable.of(null);
    }
  }

  removeLabelFromContacts(contacts: Contact[], labelId) {
    const updateContacts: Contact[] = [];

    contacts.forEach(contact => {
      const index = _.findIndex(contact.labels, {id: labelId});
      if (index !== -1) {
        contact.labels.splice(index, 1);
        updateContacts.push(contact);
      }
    });
    if (updateContacts.length > 0) {
      return this.updateMany(updateContacts)
        .do(resp => this.con.pubContacts(this.con.contacts));
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
      .do(() => {
        this.con.pubContacts(this.con.contacts);
      });
  }

  getLabelsForMenu(contact) {
    const labels = _.cloneDeep(this.store.usr.user.labels);
    labels.forEach(label => {
      if (_.find(contact.labels, {id: label.id})) {
        label.selected = true;
      } else {
        label.selected = false;
      }
    });
    return labels;
  }

  syncLabelsForApi(contact, labels) {
    labels.forEach(label => {
      const index = _.findIndex(contact.labels, {id: label.id});
      // if selected and not there add, if not selected and there, remove
      if (label.selected && index === -1) {
        contact.labels.push(label);
      } else if (!label.selected && index !== -1) {
        contact.labels.splice(index, 1);
      }
    });
    contact.labels = _.sortBy(contact.labels, 'name');
    return this.updateOne(contact);
  }

  sortByNameOrCompany(contact): boolean {
    return (contact.name && contact.name.toLowerCase()) || (contact.company && contact.company.toLowerCase());
  }

}

