import {Injectable} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {Store} from '../../store/store';
import {Util} from '../../core/services/util';
import {ContactDetailComponent} from './contact-detail-modal/contact-detail.component';
import {Messages} from '../../store/models/messages';

@Injectable()
export class OpenContactDetailService {

  constructor(protected store: Store, private mdDialog: MatDialog) {
    store.onMessage(Messages.openContactDetail, message => this.openContactDetail(message.payload));
  }

  openContactDetail(contact) {
    const config = <MatDialogConfig>{
      width: '248px',
      height: '193px',
      data: {
        contact: contact
      }
    }
    this.mdDialog.open(ContactDetailComponent, config);
  }

}
