import {AfterViewInit, Component, ContentChild, Inject, ViewChild, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Contact} from '../../../store/models/contact';
import {Store} from '../../../store/store';
import {ContactsPageService} from '../../contacts-page.service';
import {Util} from '../../../core/services/util';
import {ContactsService} from '../../../core/services/contacts.service';
import {MoreActionsBase} from '../more-actions-base';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'dk-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ContactDetailComponent extends MoreActionsBase{
  contact: Contact;

  constructor(public dialogRef: MatDialogRef<ContactDetailComponent>, @Inject(MAT_DIALOG_DATA) data: any,
              protected contactsPageService: ContactsPageService,
              store: Store, contactsService: ContactsService, mdDialog: MatDialog) {
    super(store, contactsService, mdDialog)
    this.contact = data.contact;
  }

  addLabel(label) {
    this.contactsPageService.updateLabelCounts();//dankfix: a reminder, maybe shoujld be done in the service instead?
  }

  deleteLabel(label) {
    this.contactsPageService.updateLabelCounts();
  }

  editContact(event, contact, mode) {
    event.stopPropagation();
    if (Util.keydownAndNotEnterOrSpace(event)) {
      return;
    }
    this.dialogRef.close();
    this.contactsPageService.openContactEdit(contact, mode);
  }

  deleteContact(event) {
    super.deleteContact(event)
      .subscribe(deleted => {
        if (deleted) {
          this.dialogRef.close();
        }
      })
    return Observable.of(false);
  }

  removeLabelFromContact(event) {
    super.removeLabelFromContact(event)
      .subscribe(done => {
          this.dialogRef.close();
      });
    return Observable.of(null);
  }

  getEncodedAddress(addr) {
    return 'https://maps.google.com/?q=' + encodeURIComponent(addr);
  }

  getUrl(website) {
    if (/^(http:\/\/|https:\/\/)/.test(website)) {
      return website;
    } else {
      return 'http://' + website;
    }
  }

  getNotes(notes) {
    const str = notes.replace(/\n/g, '<br>');
    return str;
  }

  getPhoneDisplay(value) {
    return value.prefix === '1' ? value.phone : value.prefix + '-' + value.phone;
  }

  getPhoneNo(value) {
    return value.prefix + value.phone.replace(/[^0-9]+/g, '');
  }

}
