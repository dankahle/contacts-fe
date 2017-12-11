import {Component, HostBinding, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Contact} from '../../../store/models/contact';
import {Store} from '../../../store/store';
import {Util} from '../../../core/services/util';
import * as _ from 'lodash';
import {UserService} from '../../../core/services/user-service';
import {ContactsPageService} from '../../contacts-page.service';
import {ContactDetailComponent} from '../contact-detail/contact-detail.component';
import {MatDialog, MatDialogConfig, MatMenuTrigger} from '@angular/material';
import {Messages} from '../../../store/models/messages';
import {BreakpointService} from '../../../core/services/breakpoint.service';

@Component({
  selector: 'dk-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ContactListComponent {
  @HostBinding('style.max-width') hostMaxWidth;
  contacts: Contact[] = [];
  messageCount: number;

  constructor(private route: ActivatedRoute, protected store: Store, protected userService: UserService,
              protected contactsPageService: ContactsPageService, private mdDialog: MatDialog,
              private breakpoints: BreakpointService) {

    this.store.subscribeSelectedLabel(label => this.syncContacts());
    this.store.subscribeContacts(label => this.syncContacts());

/*
    // an example of a dynamic hostBinding property
    this.store.leftNavClosed$.subscribe(leftnavClosed => {
      if (leftnavClosed || breakpoints.isActive('lt-md')) {
        this.hostMaxWidth = '100%';
      } else {
        this.hostMaxWidth = 'calc(100% - 284px)';
      }
    });
*/

  } // const

  syncContacts() {
    if (this.store.state.selectedLabel) {
      this.contacts = this.store.state.contacts.filter(contact =>
        _.find(contact.labels, {id: this.store.state.selectedLabel.id}));
    } else {
      this.contacts = this.store.state.contacts;
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
