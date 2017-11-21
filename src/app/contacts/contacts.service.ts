import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Contact} from './contacts.model';

@Injectable()
export class ContactsService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getAll() {
    const params = new HttpParams().set('hideSpinner', 'true');
    return this.http.get<Contact[]>(`${this.apiUrl}api/contacts`, {params: params})
  }

  getOne(id: number) {
    return this.http.get<Contact>(`${this.apiUrl}api/contacts/${id}`);
  }

}
