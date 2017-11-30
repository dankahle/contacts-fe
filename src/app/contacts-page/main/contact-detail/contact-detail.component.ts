import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Contact} from '../../../store/models/contact';
import {Store} from '../../../store/store';

@Component({
  selector: 'dk-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ContactDetailComponent {
  contact: Contact;

  constructor(public dialogRef: MatDialogRef<ContactDetailComponent>, @Inject(MAT_DIALOG_DATA) data: any,
              protected store: Store) {
    this.contact = data.contact;
  }

  addLabel(label) {
    this.store.publishUpdateLabelCounts(null);
  }

  deleteLabel(label) {
    this.store.publishUpdateLabelCounts(null);
  }


}
