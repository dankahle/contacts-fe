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
    store.subscribeContacts(contacts => this.contacts = this.filterByLabel(contacts));

    this.route.params.subscribe(params => {
      const id = this.route.snapshot.params.id;
      if (id) {
        store.setVal('selectedLabel', userService.getLabelById(id));
      } else {
        store.deleteVal('selectedLabel');
      }
    });

  }

  filterByLabel(contacts) {

    const labelId = this.route.snapshot.params.id;
    if (labelId) {
      return contacts.filter(contact => _.find(contact.labels, {id: labelId}));
    } else {
      return contacts; // contacts label chosen
    }
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
