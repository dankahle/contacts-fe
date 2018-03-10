import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {ContactDetailComponent} from './contact-detail.component';
import {SharedModule} from '../../../shared/shared.module';
import {Store} from '../../../store/store';
import {MAT_DIALOG_DATA, MatDialogRef, MatMenuModule} from '@angular/material';
import {contacts, getContacts} from '../../../../testing/mocks/store-mock';
import {providerMocks} from '../../../../testing/mocks/provider-mocks';
import {Contact} from '../../../store/models/contact';
import {ContactDetailPOB} from './contact-detail.pob';
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';
import {ContactsPageModule} from '../../contacts-page.module';
import {ContactsPageService} from '../../contacts-page.service';

describe('ContactDetailComponent', () => {
  let comp: ContactDetailComponent;
  let fixture: ComponentFixture<ContactDetailComponent>;
  let de: DebugElement;
  const dataInitial = {contact: getContacts()[0]}; // jane
  let data: {contact: Contact};
  let po: ContactDetailPOB;
  let elem;
  let dialogRef;
  let contactsPageService;
  let store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactDetailComponent],
      providers: providerMocks.concat([{provide: MAT_DIALOG_DATA, useValue: dataInitial}]),
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDetailComponent);
    comp = fixture.componentInstance;
    elem = fixture.nativeElement;
    de = fixture.debugElement;
    data = de.injector.get(MAT_DIALOG_DATA);
    dialogRef = de.injector.get(MatDialogRef);
    contactsPageService = TestBed.get(ContactsPageService);
    store = TestBed.get(Store);
    fixture.detectChanges();
    fixture.detectChanges();
    po = new ContactDetailPOB(elem); // have ngIfs in template so need to detect changes before seting up po or stuff don't show up
  });

  it('should have the correct dialog data', () => {
    expect(data).toEqual(dataInitial);
  })

  fit('should set all data to jane model', () => {
    const a = data;
    expect(po.title.textContent).toBe('jane - jane co');
    expect(po.company.textContent).toMatch(/Manager,\s+jane co/);
    expect(po.emails[0].textContent).toMatch(/jane1@gmail.com\s+•\s+Work/);
    expect(po.emails[1].textContent).toMatch(/jane2@gmail.com\s+•\s+Home/);
    expect(po.phones[0].textContent).toMatch(/111-222-3333\s+•\s+Work/);
    expect(po.phones[1].textContent).toMatch(/55-112-222-3333\s+•\s+Mobile/);
    expect(po.addresses[0].textContent).toMatch(/952 NE Lovell St. Hillsboro, OR 97124\s+•\s+Home/);
    expect(po.addresses[1].textContent).toMatch(/10260 SW Greenburg Rd #600, Tigard, OR 97223\s+•\s+Work/);
    expect(po.websites[0].textContent).toMatch(/https:\/\/www.google.com\s+•\s+google/);
    expect(po.websites[1].textContent).toMatch(/www.weather.com\s+•\s+weather/);
    expect(po.notes.textContent).toMatch(/notes first line\s*notes second line\s*notes third line/);
    expect(po.labels[0].textContent).toBe('label one');
    expect(po.labels[1].textContent).toBe('label two');
  });

  it('should call correct method/services for edit', () => {
    po.btn_edit.click();
    fixture.detectChanges();
    expect(dialogRef.close).toHaveBeenCalled();
    expect(contactsPageService.openContactEdit).toHaveBeenCalledWith(data.contact, 'edit');
  });

  it('should call correct method/services for edit', () => {
    po.btn_close.click();
    fixture.detectChanges();
    expect(dialogRef.close).toHaveBeenCalled();
  });

});
