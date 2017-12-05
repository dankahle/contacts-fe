import {Injectable} from '@angular/core';
import {Store} from '../store/store';
import {UserService} from '../core/services/user-service';
import {ContactsService} from '../core/services/contacts.service';
import * as _ from 'lodash';
import 'rxjs/add/operator/do';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ContactEditComponent} from './main/contact-edit-modal/contact-edit.component';
import {Util} from '../core/services/util';
import {ContactDetailComponent} from './main/contact-detail-modal/contact-detail.component';
import {Observable} from 'rxjs/Observable';
import {Messages} from '../store/models/messages';

@Injectable()
export class ContactsPageService {

  constructor(private store: Store, private userService: UserService, private contactsService: ContactsService,
              private mdDialog: MatDialog) {
    store.subscribeUpdateLabelCounts(contacts => this.updateLabelCounts());
  }

  // add/delete contacts will pass null in here
  updateLabelCounts() {
    const state = this.store.state;
    const contacts = state.contacts;
    state.user.labels.forEach(label => {
      label.numContacts = 0;
      contacts.forEach(contact => {
        if (_.find(contact.labels, {id: label.id})) {
          label.numContacts++;
        }
      });
    });
  }

  openContactEdit(contact, mode) {

    const config = <MatDialogConfig>{
      width: '248px',
      height: '193px',
      data: {
        mode: mode,
        contact: {...contact},
      }
    }
    this.mdDialog.open(ContactEditComponent, config)
      .afterClosed().subscribe(_contact => {
      let api$: Observable<any>;
      if (_contact) {
        // throw new Error('edit submit not implemented');
        if (mode === 'add') {
          api$ = this.contactsService.updateOne(_contact);
        } else {
          api$ = this.contactsService.addOne(_contact);
        }
        // we always open detail after add/edit
        return api$.map(apiContact => {
          this.store.emit(Messages.openContactDetail, apiContact);
        });
      } else {
        this.store.emit(Messages.openContactDetail, contact);
      }
    });
  }

}