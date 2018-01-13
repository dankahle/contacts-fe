import {Component, HostBinding, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'dk-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss']
})
export class ErrorModalComponent {
  @HostBinding('class.dkhost-error-modal') hostClass = true;
  error: { message: string, status?: number, json?: any, data?: any };

  constructor(public dialogRef: MatDialogRef<ErrorModalComponent>, @Inject(MAT_DIALOG_DATA) data: any) {
    this.error = data.error;
    if (this.error.status >= 500) {
      this.error = {message: 'Well, this is embarrassing.'};
    }
  }

}
