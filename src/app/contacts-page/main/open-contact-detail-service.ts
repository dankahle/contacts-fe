import {Injectable} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {Store} from '../../store/store';
import {Util} from '../../core/services/util';
import {ContactDetailComponent} from './contact-detail/contact-detail.component';
import {Messages} from '../../store/models/messages';

@Injectable()
export class OpenContactDetailService {

  constructor(protected store: Store, private mdDialog: MatDialog) {
    store.con.subOpenDetail(contact => this.openContactDetail(contact));
  }

  openContactDetail(contact) {
    const config = <MatDialogConfig>{
      width: '700px',
      height: '450px',
      backdropClass: 'bg-modal-backdrop',
      data: {
        contact: contact
      }
    }
    this.mdDialog.open(ContactDetailComponent, config);
  }

}
