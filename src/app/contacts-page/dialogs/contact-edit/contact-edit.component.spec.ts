import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {ContactEditComponent} from './contact-edit.component';
import {Store} from '../../../store/store';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {getContacts} from '../../../../testing/mocks/store-mock';
import {getProviderMocks} from '../../../../testing/mocks/provider-mocks';
import {Contact} from '../../../store/models/contact';
import {ContactEditPOB} from './contact-edit.pob';
import {DebugElement} from '@angular/core';
import {MaterialIndexModule} from '../../../shared/material-index/material-index.module';
import {FormsModule} from '@angular/forms';
import * as _ from 'lodash';
import {deepEql, dispatchHtmlEvent, toPlainObject} from '../../../../testing';
import {Email} from '../../../store/models/email';
import {Phone} from '../../../store/models/phone';
import {Address} from '../../../store/models/address';
import {Website} from '../../../store/models/website';

fdescribe('ContactEditComponent', () => {
  let comp: ContactEditComponent;
  let fixture: ComponentFixture<ContactEditComponent>;
  let de: DebugElement;
  const dataInitial = {contact: getContacts()[0], mode: 'edit'};
  let data: { contact: Contact };
  let po: ContactEditPOB;
  let elem;
  let dialogRef;
  let store;
  let contacts;
  let matDialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialIndexModule, FormsModule],
      declarations: [ContactEditComponent],
      providers: getProviderMocks().concat([{provide: MAT_DIALOG_DATA, useValue: dataInitial}])
      // schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactEditComponent);
    comp = fixture.componentInstance;
    elem = fixture.nativeElement;
    de = fixture.debugElement;
    data = de.injector.get(MAT_DIALOG_DATA);
    dialogRef = de.injector.get(MatDialogRef);
    matDialog = de.injector.get(MatDialog);
    store = TestBed.get(Store);
    contacts = store.con.contacts;
  });


  describe('add tests', () => {

    beforeEach(fakeAsync(() => {
      delete comp.contact;
      comp.data.mode = 'add';
      fixture.detectChanges(); // ngOnInit
      tick();
      po = new ContactEditPOB(elem, fixture); // ngIfs require detect changes
    }));

    it('data empty in init (add mode)', () => {
      expect(po.name.value).toBe('');
      expect(po.company.value).toBe('');
      expect(po.jobTitle.value).toBe('');
      expect(po.emails.length).toBe(1);
      expect(po.emails[0].value).toBe('');
      expect(po.emailLabels[0].value).toBe('');
      expect(po.phones.length).toBe(1);
      expect(po.phones[0].value).toBe('');
      expect(po.phoneLabels[0].value).toBe('');
      expect(po.addrs.length).toBe(1);
      expect(po.addrs[0].value).toBe('');
      expect(po.addrLabels[0].value).toBe('');
      expect(po.websites.length).toBe(1);
      expect(po.websites[0].value).toBe('');
      expect(po.websiteLabels[0].value).toBe('');
      expect(po.notes.value).toBe('');
    });

    it('all multiple fields extend', fakeAsync(() => {
      expect(po.emails.length).toBe(1);
      po.addButtons[0].click();
      tick();
      fixture.detectChanges();
      po.getElements();
      expect(po.emails.length).toBe(2);
      po.addButtons[0].click();
      tick();
      fixture.detectChanges();
      po.getElements();
      expect(po.emails.length).toBe(3);

      expect(po.phones.length).toBe(1);
      po.addButtons[1].click();
      tick();
      fixture.detectChanges();
      po.getElements();
      expect(po.phones.length).toBe(2);

      expect(po.addrs.length).toBe(1);
      po.addButtons[2].click();
      tick();
      fixture.detectChanges();
      po.getElements();
      expect(po.addrs.length).toBe(2);

      expect(po.websites.length).toBe(1);
      po.addButtons[3].click();
      tick();
      fixture.detectChanges();
      po.getElements();
      expect(po.websites.length).toBe(2);

    }));

  });

  describe('edit tests', () => {
    beforeEach(fakeAsync(() => {
      fixture.detectChanges();
      tick();
      po = new ContactEditPOB(elem, fixture); // ngIfs require detect changes
    }));

    it('injected data good (edit mode)', () => {
      expect(comp.data).toEqual(dataInitial);
    });

    it('all inputs and labels set to correct data (edit mode)', () => {
      expect(po.name.value).toBe('jane');
      expect(po.company.value).toBe('jane co');
      expect(po.jobTitle.value).toBe('Manager');
      expect(po.emails.length).toBe(2);
      expect(po.emails[0].value).toBe('jane1@gmail.com');
      expect(po.emailLabels[0].value).toBe('Work');
      expect(po.emails[1].value).toBe('jane2@gmail.com');
      expect(po.emailLabels[1].value).toBe('Home');
      expect(po.phones.length).toBe(2);
      expect(po.phoneMatSelects[0].selected.value).toBe('1');
      expect(po.phones[0].value).toBe('111-222-3333');
      expect(po.phoneLabels[0].value).toBe('Work');
      expect(po.phoneMatSelects[1].selected.value).toBe('55');
      expect(po.phones[1].value).toBe('112-222-3333');
      expect(po.phoneLabels[1].value).toBe('Mobile');
      expect(po.addrs.length).toBe(2);
      expect(po.addrs[0].value).toBe('952 NE Lovell St. Hillsboro, OR 97124');
      expect(po.addrLabels[0].value).toBe('Home');
      expect(po.addrs[1].value).toBe('10260 SW Greenburg Rd #600, Tigard, OR 97223');
      expect(po.addrLabels[1].value).toBe('Work');
      expect(po.websites.length).toBe(2);
      expect(po.websites[0].value).toBe('https://www.google.com');
      expect(po.websiteLabels[0].value).toBe('google');
      expect(po.websites[1].value).toBe('www.weather.com');
      expect(po.websiteLabels[1].value).toBe('weather');
      expect(po.notes.value).toBe('notes first line\nnotes second line\nnotes third line');
    });

    it('all fields clear and delete if multiple', fakeAsync(() => {
      expect(comp.contact.name).toBe('jane');
      expect(po.name.value).toBe('jane');
      po.clearButtons[0].click();
      fixture.detectChanges();
      tick();
      expect(comp.contact.name).toBe('');
      expect(po.name.value).toBe('');

      expect(comp.contact.company).toBe('jane co');
      expect(po.company.value).toBe('jane co');
      expect(comp.contact.jobTitle).toBe('Manager');
      expect(po.jobTitle.value).toBe('Manager');
      po.clearButtons[1].click();
      fixture.detectChanges();
      tick();
      expect(comp.contact.company).toBe('');
      expect(po.company.value).toBe('');
      expect(comp.contact.jobTitle).toBe('');
      expect(po.jobTitle.value).toBe('');

      expect(po.emails.length).toBe(2);
      expect(po.emails[0].value).toBe('jane1@gmail.com');
      expect(po.emailLabels[0].value).toBe('Work');
      expect(po.emails[1].value).toBe('jane2@gmail.com');
      expect(po.emailLabels[1].value).toBe('Home');
      po.clearButtons[3].click();
      fixture.detectChanges();
      tick();
      po.getElements();
      expect(po.emails.length).toBe(1);
      expect(po.emails[0].value).toBe('jane1@gmail.com');
      expect(po.emailLabels[0].value).toBe('Work');
      po.clearButtons[2].click();
      fixture.detectChanges();
      tick();
      po.getElements();
      expect(po.emails.length).toBe(1);
      expect(po.emails[0].value).toBe('');
      expect(po.emailLabels[0].value).toBe('');

      expect(po.phones.length).toBe(2);
      expect(po.phoneMatSelects[0].selected.value).toBe('1');
      expect(po.phones[0].value).toBe('111-222-3333');
      expect(po.phoneLabels[0].value).toBe('Work');
      expect(po.phoneMatSelects[1].selected.value).toBe('55');
      expect(po.phones[1].value).toBe('112-222-3333');
      expect(po.phoneLabels[1].value).toBe('Mobile');
      po.clearButtons[3].click();
      fixture.detectChanges();
      tick();
      po.getElements();
      expect(po.phones.length).toBe(1);
      expect(po.phoneMatSelects[0].selected.value).toBe('55');
      expect(po.phones[0].value).toBe('112-222-3333');
      expect(po.phoneLabels[0].value).toBe('Mobile');
      po.clearButtons[3].click();
      fixture.detectChanges();
      tick();
      po.getElements();
      expect(po.phones.length).toBe(1);
      expect(po.phoneMatSelects[0].selected).not.toBeDefined();
      expect(po.phones[0].value).toBe('');
      expect(po.phoneLabels[0].value).toBe('');

      expect(po.addrs.length).toBe(2);
      expect(po.addrs[0].value).toBe('952 NE Lovell St. Hillsboro, OR 97124');
      expect(po.addrLabels[0].value).toBe('Home');
      expect(po.addrs[1].value).toBe('10260 SW Greenburg Rd #600, Tigard, OR 97223');
      expect(po.addrLabels[1].value).toBe('Work');
      po.clearButtons[5].click();
      fixture.detectChanges();
      tick();
      po.getElements();
      expect(po.addrs.length).toBe(1);
      expect(po.addrs[0].value).toBe('952 NE Lovell St. Hillsboro, OR 97124');
      expect(po.addrLabels[0].value).toBe('Home');
      po.clearButtons[4].click();
      fixture.detectChanges();
      tick();
      po.getElements();
      expect(po.addrs.length).toBe(1);
      expect(po.addrs[0].value).toBe('');
      expect(po.addrLabels[0].value).toBe('');

      expect(po.websites.length).toBe(2);
      expect(po.websites[0].value).toBe('https://www.google.com');
      expect(po.websiteLabels[0].value).toBe('google');
      expect(po.websites[1].value).toBe('www.weather.com');
      expect(po.websiteLabels[1].value).toBe('weather');
      po.clearButtons[6].click();
      fixture.detectChanges();
      tick();
      po.getElements();
      expect(po.websites.length).toBe(1);
      expect(po.websites[0].value).toBe('https://www.google.com');
      expect(po.websiteLabels[0].value).toBe('google');
      po.clearButtons[5].click();
      fixture.detectChanges();
      tick();
      po.getElements();
      expect(po.websites.length).toBe(1);
      expect(po.websites[0].value).toBe('');
      expect(po.websiteLabels[0].value).toBe('');
    }));

    // starts with only, doesn't look inside string, just beginning
    it('filtering menu choices', () => {
      // email and addr
      expect(comp.emailAddrLabels).toEqual(['Home', 'Work', 'Other']);
      expect(comp.filterEmailAddrLabels('x')).toEqual([]);
      expect(comp.filterEmailAddrLabels('h')).toEqual(['Home']);
      expect(comp.filterEmailAddrLabels('home')).toEqual(['Home']);
      expect(comp.filterEmailAddrLabels('HOME')).toEqual(['Home']);
      expect(comp.filterEmailAddrLabels('ome')).toEqual([]);
      expect(comp.filterEmailAddrLabels('o')).toEqual(['Other']);

      expect(comp.phoneLabels).toEqual(['Home', 'Work', 'Other', 'Mobile', 'Main', 'Home Fax', 'Work Fax', 'Google Voice', 'Pager']);
      expect(comp.filterPhoneLabels('x')).toEqual([]);
      expect(comp.filterPhoneLabels('w')).toEqual(['Work', 'Work Fax']);

      expect(comp.webLabels).toEqual(['Profile', 'Blog', 'Home Page', 'Work']);
      expect(comp.filterWebLabels('x')).toEqual([]);
      expect(comp.filterWebLabels('h')).toEqual(['Home Page']);
      expect(comp.filterWebLabels('b')).toEqual(['Blog']);
    });

    it('ngOnDestroy unsubscribes to subscriptions', () => {
      spyOn(comp.subs_backdropClick, 'unsubscribe');
      spyOn(comp.subs_keydownEvents, 'unsubscribe');
      comp.ngOnDestroy();
      expect(comp.subs_backdropClick.unsubscribe).toHaveBeenCalled();
      expect(comp.subs_keydownEvents.unsubscribe).toHaveBeenCalled();
    });

    it('updateNameAndCompanyValidation() called on (input/blur)', () => {
      spyOn(comp, 'updateNameAndCompanyValidation');
      dispatchHtmlEvent(po.name, 'input');
      expect(comp.updateNameAndCompanyValidation).toHaveBeenCalledTimes(1);
      dispatchHtmlEvent(po.name, 'blur');
      expect(comp.updateNameAndCompanyValidation).toHaveBeenCalledTimes(2);
      dispatchHtmlEvent(po.company, 'input');
      expect(comp.updateNameAndCompanyValidation).toHaveBeenCalledTimes(3);
      dispatchHtmlEvent(po.company, 'blur')
      expect(comp.updateNameAndCompanyValidation).toHaveBeenCalledTimes(4);
      dispatchHtmlEvent(po.jobTitle, 'blur')
      expect(comp.updateNameAndCompanyValidation).toHaveBeenCalledTimes(4);
    });

    it('hasNameOrCompany', () => {
      comp.contact.name = comp.contact.company = 'x';
      expect(comp.hasNameOrCompany()).toBeTruthy();
      comp.contact.name = '';
      expect(comp.hasNameOrCompany()).toBeTruthy();
      comp.contact.company = '';
      expect(comp.hasNameOrCompany()).toBeFalsy();
      comp.contact.name = comp.contact.company = '  ';
      expect(comp.hasNameOrCompany()).toBeFalsy();
    });


    it('addMissingFields', () => {
      comp.contact = <any>{emails: [], phones: [], addresses: [], websites: []};
      comp.addMissingFields();
      const c = comp.contact;
      expect(c.name).toBe('');
      expect(c.company).toBe('');
      expect(c.jobTitle).toBe('');
      expect(c.notes).toBe('');
      expect(c.emails.length).toBe(1);
      // toEqual fails here, it assumes it's a plain js object, which it isn't. You could do JSON.parse(JSON.stringify(obj)) to make it a plain
      // object (your toPlainObject helper), but deep-equal takes own/prototype properties into account. It has to be called with option.strict=true
      // though, so make it a helper and use it from there.
      expect(toPlainObject(c.emails[0])).toEqual({email: '', label: ''});
      expect(toPlainObject(c.phones[0])).toEqual({prefix: '', phone: '', label: ''});
      expect(toPlainObject(c.addresses[0])).toEqual({address: '', label: ''});
      expect(toPlainObject(c.websites[0])).toEqual({website: '', label: ''});
    });

    it('removeEmptyFields', () => {
      const c = comp.contact = <Contact>{
        name: ' ',
        company: ' ',
        jobTitle: ' ',
        notes: ' ',
        emails: [new Email(' ', ' '), new Email(' ', ' ')],
        phones: [new Phone(' ', ' ', ' '), new Phone(' ', ' ', ' ')],
        addresses: [new Address(' ', ' '), new Address(' ', ' ')],
        websites: [new Website(' ', ' '), new Website(' ', ' ')],
      };
      comp.removeEmptyFields();
      expect(c.name).not.toBeDefined();
      expect(c.company).not.toBeDefined();
      expect(c.jobTitle).not.toBeDefined();
      expect(c.notes).not.toBeDefined();
      expect(c.emails.length).toBe(1);
      expect(c.emails[0].email).toBe('');
      expect(c.emails[0].label).toBe('');

      expect(c.phones.length).toBe(1);
      expect(c.phones[0].prefix).toBe('');
      expect(c.phones[0].phone).toBe('');
      expect(c.phones[0].label).toBe('');

      expect(c.addresses.length).toBe(1);
      expect(c.addresses[0].address).toBe('');
      expect(c.addresses[0].label).toBe('');

      expect(c.websites.length).toBe(1);
      expect(c.websites[0].website).toBe('');
      expect(c.websites[0].label).toBe('');
    });

    fit('cancelDialog', fakeAsync(() => {
      comp.cancelDialog({type: 'keydown', which: 28});
      expect(dialogRef.close).toHaveBeenCalledTimes(0);
      comp.cancelDialog({type: 'keydown', which: 27});
      expect(dialogRef.close).toHaveBeenCalledTimes(1);
      comp.cancelDialog();
      expect(dialogRef.close).toHaveBeenCalledTimes(2);

      expect(matDialog.open).toHaveBeenCalledTimes(0);
      comp.contact.name = comp.contact.name + 'x';
      matDialog.returnValue = true;
      comp.cancelDialog();
      expect(dialogRef.close).toHaveBeenCalledTimes(2);
      tick();
      expect(matDialog.open).toHaveBeenCalledTimes(1);
      expect(dialogRef.close).toHaveBeenCalledTimes(3); // can't do this
      delete matDialog.returnValue;
    }));

    it('', () => {

    });

    it('', () => {

    });

  });

});
