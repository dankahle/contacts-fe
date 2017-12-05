import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Messages} from '../../../store/models/messages';
import {Store} from '../../../store/store';
import {Contact} from '../../../store/models/contact';
import {Chance} from 'chance';
import * as _ from 'lodash';

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
        id: chance.guid()
      };
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
