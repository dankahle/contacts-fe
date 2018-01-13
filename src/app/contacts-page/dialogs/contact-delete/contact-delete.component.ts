import {Component, HostBinding, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {Store} from '../../../store/store';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'dk-contact-delete',
  templateUrl: './contact-delete.component.html',
  styleUrls: ['./contact-delete.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContactDeleteComponent {
  @HostBinding('class.dkhost-contact-delete') hostClass = true;

  constructor(protected store: Store, protected dialogRef: MatDialogRef<ContactDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

}

