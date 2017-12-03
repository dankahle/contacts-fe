import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Contact} from '../../../store/models/contact';
import {Store} from '../../../store/store';
import {ContactsPageService} from '../../contacts-page.service';
import {Util} from '../../../core/services/util';

@Component({
  selector: 'dk-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ContactDetailComponent {
  contact: Contact;

  constructor(public dialogRef: MatDialogRef<ContactDetailComponent>, @Inject(MAT_DIALOG_DATA) data: any,
              protected store: Store, protected contactsPageService: ContactsPageService) {
    this.contact = data.contact;
  }

  addLabel(label) {
    this.store.publishUpdateLabelCounts();
  }

  deleteLabel(label) {
    this.store.publishUpdateLabelCounts();
  }

  editContact(event, contact, mode) {
    event.stopPropagation();
    if (Util.keydownAndNotEnterOrSpace(event)) {
      return;
    }
    this.dialogRef.close();
    this.contactsPageService.openContactEdit(contact, mode);
  }



}
