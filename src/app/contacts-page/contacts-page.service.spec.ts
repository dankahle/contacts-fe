import {ContactsPageService} from './contacts-page.service';
import {async, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';
import {getProviderMocks} from '../../testing/mocks/provider-mocks';
import {ContactsService} from '../core/services/contacts.service';
import {UserService} from '../core/services/user-service';
import {MatDialog, MatDialogRef} from '@angular/material';
import {Store} from '../store/store';
import {Provider} from '@angular/core';
import {ContactEditComponent} from './dialogs/contact-edit/contact-edit.component';
import {MatDialogMock} from '../../testing/mocks/mat-dialog-mock';
import createSpy = jasmine.createSpy;


describe('ContactsPageService', () => {
  let svc: ContactsPageService, user, contacts, contactsService, matDialog: MatDialogMock;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: getProviderMocks(ContactsPageService)
    });
  }))

  beforeEach(inject([Store, UserService, ContactsService, MatDialog], (store, userService, _contactsService, _matDialog) => {
    svc = new ContactsPageService(store, userService, _contactsService, _matDialog);
    user = store.usr.user;
    contacts = store.con.contacts;
    contactsService = _contactsService;
    matDialog = _matDialog;
  }));

  it('updateLabelCounts', () => {
    // updateLabelCounts gets called from constructor, so don't have to call it
    expect(user.labels[0].numContacts).toBe(2);
    expect(user.labels[1].numContacts).toBe(2);
    expect(user.labels[2].numContacts).toBe(0);
  });

  it('openContactEdit (add)', fakeAsync(() => {
    const add = 'add';
    const contact = contacts[0];
    matDialog.returnValue = contact;
    svc.openContactEdit(contact, add);
    const args = matDialog.open.calls.argsFor(0);
    expect(args[0]).toBe(ContactEditComponent);
    expect(args[1].data.contact).toBe(contact);
    expect(args[1].data.mode).toBe(add);
    tick();
    expect(contactsService.addOne).toHaveBeenCalledTimes(1);
    expect(contactsService.addOne).toHaveBeenCalledWith(contact);
  }));

  it('openContactEdit (edit)', fakeAsync(() => {
    const edit = 'edit';
    const contact = contacts[0];
    matDialog.returnValue = contact;
    svc.openContactEdit(contact, edit);
    const args = matDialog.open.calls.argsFor(0);
    expect(args[0]).toBe(ContactEditComponent);
    expect(args[1].data.contact).toBe(contact);
    expect(args[1].data.mode).toBe(edit);
    tick();
    expect(contactsService.updateOne).toHaveBeenCalledTimes(1);
    expect(contactsService.updateOne).toHaveBeenCalledWith(contact);
  }));

});
