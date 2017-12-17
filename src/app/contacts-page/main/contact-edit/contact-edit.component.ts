import {ApplicationRef, Component, Inject, NgZone, OnInit, ViewChildren, ViewEncapsulation} from '@angular/core';
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

const chance = new Chance();

@Component({
  selector: 'dk-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ContactEditComponent {
  Object = Object;
  @ViewChildren('emailRef') emailEdits;
  @ViewChildren('email') emails = [];
  contact: Contact;
  addMode = false;
  editMode = false;

  constructor(protected store: Store, protected dialogRef: MatDialogRef<ContactEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    if (data.mode === 'add') {
      this.addMode = true;
      this.contact = <Contact>{
        id: chance.guid(),
      };
      if (this.store.selectedLabel) {
        const label = this.store.selectedLabel;
        this.contact.labels = [<Label>{id: label.id, name: label.name, icon: 'label'}];
      }
    } else {
      this.editMode = true;
      this.contact = _.cloneDeep(data.contact);
    }
    this.addMissingFields();
  }


  /*
  name
company jobtitle
emails
phones
address
websites
notes

   */
  addMissingFields() {
    const c = this.contact;
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
    this.contact.emails.push(<Email>{});
    setTimeout(() => {
      this.emailEdits.last.nativeElement.focus();
    });
  }


  submit(form) {
    if (form.valid) {
      this.removeEmptyFields();
      this.dialogRef.close(this.contact);
    }
  }

}
