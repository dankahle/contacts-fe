import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Messages} from '../../../store/models/messages';
import {Store} from '../../../store/store';

@Component({
  selector: 'dk-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ContactEditComponent implements OnInit {

  constructor(protected store: Store, protected dialogRef: MatDialogRef<ContactEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
  }

  submit() {
    // this.http.updateORaddContact()
    // update local contact with copy for modal
    //.subscribe(apiContact => this.close(apiContact));
    this.close();
  }

  close() {
    this.dialogRef.close();
    this.store.emit(Messages.openContactDetail, this.data.contact);
  }

}
