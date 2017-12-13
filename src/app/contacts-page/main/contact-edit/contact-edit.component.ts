import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Messages} from '../../../store/models/messages';
import {Store} from '../../../store/store';
import {Contact} from '../../../store/models/contact';
import {Chance} from 'chance';
import * as _ from 'lodash';
import {Label} from '../../../store/models/label';

const chance = new Chance();

@Component({
  selector: 'dk-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ContactEditComponent {
contact: Contact;

  constructor(protected store: Store, protected dialogRef: MatDialogRef<ContactEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    if (data.mode === 'add') {
      this.contact = <Contact>{
        id: chance.guid(),
      };
      if (this.store.selectedLabel) {
        const label = this.store.selectedLabel;
        this.contact.labels = [<Label>{id: label.id, name: label.name, icon: 'label'}]
      }
    } else {
      this.contact = _.cloneDeep(data.contact);
    }
  }

  submit(form) {
    if (form.valid) {
      this.dialogRef.close(this.contact);
    }
  }

}
