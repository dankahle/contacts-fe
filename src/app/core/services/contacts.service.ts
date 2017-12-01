import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Contact} from '../../store/models/contact';
import {Store} from '../../store/store';
import * as _ from 'lodash';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ActivatedRouteSnapshot, Router, RouterModule} from '@angular/router';

@Injectable()
export class ContactsService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private store: Store, private route: ActivatedRoute) {
  }

  getAll(id?: string, saveToState?: boolean) {
    // const params = new HttpParams().set('hideSpinner', 'true');
    // return this.http.get<Contact[]>(`${this.apiUrl}api/contacts`, {params: params});
    let params = new HttpParams();
    if (id) {
      params = params.set('label', id);
    }
    return this.http.get<Contact[]>(`${this.apiUrl}api/contacts`, {params: params})
      .do(contacts => {
        if (saveToState) {
          this.store.setContacts(contacts);
        }
        if (!id) {
          // can only do this with "all" contacts
          this.store.publishUpdateLabelCounts(contacts);
        }
      });
  }

  getOne(id: number) {
    return this.http.get<Contact>(`${this.apiUrl}api/contacts/${id}`);
  }

  updateMany(contacts: Contact[]) {
    return this.http.put<Contact>(`${this.apiUrl}api/contacts`, contacts);
  }

  deleteAllWithLabel(contacts, labelId) {
    const params = new HttpParams().set('label', labelId);
    return this.http.delete<any>(`${this.apiUrl}api/contacts`, {params: params})
      .mergeMap(resp => {
        if (this.route.snapshot.params.id) {
          return this.getAll(this.route.snapshot.params.id, true);
        } else {
          return this.getAll(null, true);
        }
      });
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
        .do(resp => this.store.publishContacts());
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

}
