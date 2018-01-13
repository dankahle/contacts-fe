import {Component, HostBinding, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {DeleteLabelMode} from '../../../store/enums/deleteLabelMode.enum';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {EditLabelComponent} from '../edit-label/edit-label.component';

@Component({
  selector: 'dk-delete-label',
  templateUrl: './delete-label.component.html',
  styleUrls: ['./delete-label.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DeleteLabelComponent implements OnInit {
  @HostBinding('class.dkhost-delete-label') hostClass = true;
  keepContacts = DeleteLabelMode.keepContacts;
  deleteContacts = DeleteLabelMode.deleteContacts;

  constructor(protected dialogRef: MatDialogRef<DeleteLabelComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    data.deleteMode = DeleteLabelMode.keepContacts;
  }

  ngOnInit() {
  }

  submit(form) {
    if (form.valid) {
      this.dialogRef.close(this.data);
    }
  }
}
