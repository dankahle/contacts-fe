import {Component, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Contact} from '../../../store/models/contact';
import {Store} from '../../../store/store';
import {Util} from '../../../core/services/util';
import * as _ from 'lodash';
import {UserService} from '../../../core/services/user-service';
import {ContactsPageService} from '../../contacts-page.service';
import {ContactDetailComponent} from '../contact-detail-modal/contact-detail.component';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {Messages} from '../../../store/models/messages';

@Component({
  selector: 'dk-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ContactListComponent {
  contacts: Contact[] = [];
  messageCount: number;

  constructor(private route: ActivatedRoute, protected store: Store, protected userService: UserService,
              protected contactsPageService: ContactsPageService, private mdDialog: MatDialog) {

    route.data.subscribe(data => {
      return this.contacts = data.contacts;
    });
    this.store.subscribeContacts(contacts => {
      if (store.state.selectedLabel) {
        this.contacts = this.store.state.contacts.filter(contact =>
          _.find(contact.labels, {id: this.store.state.selectedLabel.id}));
      } else {
        this.contacts = contacts;
      }
    });
  }

  editContact(event, contact, mode) {
    event.stopPropagation();
    if (Util.keydownAndNotEnterOrSpace(event)) {
      return;
    }
    this.contactsPageService.openContactEdit(contact, mode);
  }

  openContactDetail(event, contact) {
    event.stopPropagation();
    if (Util.keydownAndNotEnterOrSpace(event)) {
      return;
    }
    this.store.emit(Messages.openContactDetail, contact);
  }

}
