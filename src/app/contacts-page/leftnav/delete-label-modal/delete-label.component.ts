import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {DeleteLabelMode} from '../../../store/enums/deleteLabelMode.enum';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {EditLabelComponent} from '../edit-label-modal/edit-label.component';

@Component({
  selector: 'dk-delete-label',
  templateUrl: './delete-label.component.html',
  styleUrls: ['./delete-label.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class DeleteLabelComponent implements OnInit {
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
