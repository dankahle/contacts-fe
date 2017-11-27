import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Contact} from '../../store/models/contact';
import {Store} from '../../store/store';

@Injectable()
export class ContactsService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private store: Store) {
  }

  getAll(id?: string) {
    // const params = new HttpParams().set('hideSpinner', 'true');
    // return this.http.get<Contact[]>(`${this.apiUrl}api/contacts`, {params: params});
    let params = new HttpParams();
    if (id) {
      params = params.set('label', id);
    }
    return this.http.get<Contact[]>(`${this.apiUrl}api/contacts`, {params: params});
  }

  getOne(id: number) {
    return this.http.get<Contact>(`${this.apiUrl}api/contacts/${id}`);
  }

  /**
   * init
   * @desc - called when app initialization is complete
   */
  init() {
  }

}
