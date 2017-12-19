import {
  AfterViewInit, ApplicationRef, Component, Inject, NgZone, OnInit, ViewChild, ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Messages} from '../../../store/models/messages';
import {Store} from '../../../store/store';
import {Contact} from '../../../store/models/contact';
import {Chance} from 'chance';
import * as _ from 'lodash';
import * as $ from 'jquery';
import {Label} from '../../../store/models/label';
import {Email} from '../../../store/models/email';
import {Phone} from '../../../store/models/phone';
import {Address} from '../../../store/models/address';
import {Website} from '../../../store/models/website';
import {AbstractControl, NgModel, Validator, ValidatorFn, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';

const chance = new Chance();

@Component({
  selector: 'dk-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ContactEditComponent implements AfterViewInit {
  log = console.log;
  @ViewChild('form') form;
  @ViewChild('nameRef') nameRef;
  @ViewChild('nameNg') nameNg;
  @ViewChild('companyNg') companyNg;
  @ViewChildren('emailRef') emailRefs;
  @ViewChildren('emailLabelNg') emailLabelNgs;
  @ViewChildren('addrRef') addrRefs;
  @ViewChildren('addrLabelNg') addrLabelNgs;
  contact: Contact;
  addMode = false;
  editMode = false;
  emailAddrLabels = ['Home', 'Work', 'Other'];
  filteredEmailLabels = Observable.of(this.emailAddrLabels);
  filteredAddrLabels = Observable.of(this.emailAddrLabels);

  constructor(protected store: Store, protected dialogRef: MatDialogRef<ContactEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    if (data.mode === 'add') {
      this.addMode = true;
      this.contact = <Contact>{id: chance.guid(), labels: [], emails: [], phones: [], addresses: [], websites: []};
      if (this.store.selectedLabel) {
        const label = this.store.selectedLabel;
        this.contact.labels.push(<Label>{id: label.id, name: label.name, icon: 'label'});
      }
    } else {
      this.editMode = true;
      this.contact = _.cloneDeep(data.contact);
    }
    this.addMissingFields();
  }

  ngAfterViewInit() {
    this.nameNg.control.setValidators([this.nameOrCompanyValidator()]);
    this.companyNg.control.setValidators([this.nameOrCompanyValidator()]);

    this.emailLabelNgs.forEach(ng => {
      this.filteredEmailLabels = ng.control.valueChanges
        .startWith(null)
        .do(val => console.log('email', val))
        .map(val => val ? this.filterEmailAddrLabels(val) : this.emailAddrLabels);
    });

    this.addrLabelNgs.forEach(ng => {
      this.filteredAddrLabels = ng.control.valueChanges
        .startWith(null)
        .do(val => console.log('addr', val))
        .map(val => val ? this.filterEmailAddrLabels(val) : this.emailAddrLabels);
    });
  }

  filterEmailAddrLabels(val: string): string[] {
    return this.emailAddrLabels.filter(label => label.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  // this didn't work. The idea was: hold off initial (input) validation (email) till blur (ngModelOptions.updateOn=blur), and on (input)
  // call this, but this doesn't set validity for some reason. Ng parses out the validation on element and forces
  // it to blur only somehow. I figure if I added validators manually, it would work (like nameOrCompany above, but
  // these are dynamic, so a hassle to do.
/*
  validateEmail(emailNg) {
    if (emailNg.touched) {
      emailNg.control.updateValueAndValidity();
    }
  }
*/

  updateNameAndCompanyValidation() {
    this.nameNg.control.updateValueAndValidity();
    this.companyNg.control.updateValueAndValidity();
  }

  nameOrCompanyValidator(): ValidatorFn {
    return ((control: AbstractControl): {[key: string]: any} => {
      const rtn = !this.hasNameOrCompany() &&
      this.nameNg.touched && this.companyNg.touched ? {'nameOrCompany': {value: control.value}} : null;
      return rtn;
    });
  }

  hasNameOrCompany() {
    return ((this.contact.name && this.contact.name.trim()) || (this.contact.company && this.contact.company.trim()));
  }

  addMissingFields() {
    const c = this.contact;
    c.name = c.name || '';
    c.company = c.company || '';
    c.jobTitle = c.jobTitle || '';
    if (!c.emails.length) {
      c.emails.push(new Email());
    }
    if (!c.phones.length) {
      c.phones.push(new Phone());
    }
    if (!c.addresses.length) {
      c.addresses.push(new Address());
    }
    if (!c.websites.length) {
      c.websites.push(new Website());
    }
  }

  removeEmptyFields() {
    const c = this.contact;
    if (!c.name.trim()) {
      delete c.name;
    }
    if (!c.company.trim()) {
      delete c.company;
    }
    if (!c.jobTitle.trim()) {
      delete c.jobTitle;
    }
    _.forEachRight(c.emails, (v, i) => {
      if (!v.email.trim()) {
        c.emails.splice(i, 1);
      }
    });
    _.forEachRight(c.phones, (v, i) => {
      if (!v.phone.trim()) {
        c.phones.splice(i, 1);
      }
    });
    _.forEachRight(c.addresses, (v, i) => {
      if (!v.address.trim()) {
        c.addresses.splice(i, 1);
      }
    });
    _.forEachRight(c.websites, (v, i) => {
      if (!v.website.trim()) {
        c.websites.splice(i, 1);
      }
    });
  }

  addEmail() {
    this.contact.emails.push(new Email());
    setTimeout(() => {
      this.emailRefs.last.nativeElement.focus();
      this.filteredEmailLabels = this.emailLabelNgs.last.control.valueChanges
        .startWith(null)
        .do(val => console.log('email', val))
        .map(val => val ? this.filterEmailAddrLabels(val) : this.emailAddrLabels);

    });
  }

  addAddress() {
    this.contact.addresses.push(new Address());
    setTimeout(() => {
      this.addrRefs.last.nativeElement.focus();
      this.filteredAddrLabels = this.addrLabelNgs.last.control.valueChanges
        .startWith(null)
        .do(val => console.log('addr', val))
        .map(val => val ? this.filterEmailAddrLabels(val) : this.emailAddrLabels);
    });
  }

  save(form) {
    if (!this.hasNameOrCompany()) {
      this.nameNg.control.markAsTouched();
      this.companyNg.control.markAsTouched();
      this.nameNg.control.updateValueAndValidity();
      this.companyNg.control.updateValueAndValidity();
      return;
    }

    if (form.valid) {
      this.removeEmptyFields();
      this.dialogRef.close(this.contact);
    }
  }

}
