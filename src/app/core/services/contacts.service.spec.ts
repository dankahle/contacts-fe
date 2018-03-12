import {async, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';
import {getProviderMocks} from '../../../testing/mocks/provider-mocks';
import {ContactsService} from './contacts.service';
import {Store} from '../../store/store';
import {UserService} from './user-service';
import {MatDialog} from '@angular/material';
import {ContactEditComponent} from '../../contacts-page/dialogs/contact-edit/contact-edit.component';
import {HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {Contact} from '../../store/models/contact';
import {User} from '../../store/models/user';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ModifyRequestInterceptor} from '../interceptors/modify-request.interceptor';
import * as _ from 'lodash';

fdescribe('ContactsService', () => {
  let svc: ContactsService, user: User, contacts: Contact[], store: Store, httpTestingController;
  const apiUrl = 'http://localhost:3001/';

    beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: getProviderMocks(ContactsService).concat([{provide: HTTP_INTERCEPTORS, useClass: ModifyRequestInterceptor, multi: true}])
    });
    httpTestingController = TestBed.get(HttpTestingController);
  }))

  beforeEach(inject([HttpClient, Store], (_httpClient, _store) => {
    svc = new ContactsService(_httpClient, _store);
    store = _store;
    user = store.usr.user;
    contacts = _.cloneDeep(store.con.contacts);
  }));

  afterEach(() => {
    httpTestingController.verify();
  })

  it('getContactDisplayNameSort', () => {
    expect(contacts.map(c => c.name || c.company)).toEqual(['jane', 'Brenda', 'Martha Co']);
    contacts = _.sortBy(contacts, svc.getContactDisplayNameSort);
    expect(contacts.map(c => c.name || c.company)).toEqual(['Brenda', 'jane', 'Martha Co']);
  })

  it('getContactDisplayNameSort', () => {
    expect(svc.getContactDisplayNameSort(contacts[0])).toBe('jane - jane co');
    expect(svc.getContactDisplayNameSort(contacts[1])).toBe('brenda');
    expect(svc.getContactDisplayNameSort(contacts[2])).toBe('martha co');
  })

  it('getAll', () => {
    svc.getAll().subscribe(rtn => {
      expect(rtn).toEqual(_.sortBy(contacts, svc.getContactDisplayNameSort));
    })
    const req = httpTestingController.expectOne(`${apiUrl}api/contacts`);
    expect(req.request.method).toEqual('GET');
    expect(req.request.withCredentials).toBe(true); // cors settings work via ModifyRequestInterceptor
    req.flush(contacts);
  });


});
