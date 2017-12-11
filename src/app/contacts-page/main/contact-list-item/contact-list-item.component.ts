import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Contact} from '../../../store/models/contact';
import {ContactListComponent} from '../contact-list/contact-list.component';
import {Util} from '../../../core/services/util';
import {ContactsPageService} from '../../contacts-page.service';
import {Store} from '../../../store/store';
import {MatMenu, MatMenuTrigger} from '@angular/material';
import {ContactsService} from '../../../core/services/contacts.service';
import * as _ from 'lodash';

@Component({
  selector: 'dk-contact-list-item',
  templateUrl: './contact-list-item.component.html',
  styleUrls: ['./contact-list-item.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ContactListItemComponent {
  @Input() contact: Contact;
  @ViewChild(MatMenu) menu: MatMenu;
  @ViewChild(MatMenuTrigger) menuTrigger: MatMenuTrigger;
  log = console.log;

  constructor(protected parent: ContactListComponent, protected contactsPageService: ContactsPageService,
              protected store: Store, protected contactsService: ContactsService) {
  }

  moreActions(event, contact) {
    event.stopPropagation();
    // this.contactsPageService.openMoreActions(event, contact);
    // this.contactsPageService.openMoreActionsMenu(event, contact);
    // this.store.publishMoreActionsMenu(event, contact);
  }

  menuClose() {
    this.store.publishUpdateLabelCounts();
  }

  removeLabelFromContact(event) {
    event.stopPropagation();
    this.contactsService.removeLabelFromContact(this.contact, this.store.state.selectedLabel)
      .subscribe(() => this.menuTrigger.closeMenu());
  }

  deleteContact(event) {
    event.stopPropagation();
    this.contactsService.deleteOne(this.contact.id)
      .subscribe(() => this.menuTrigger.closeMenu());
  }

  toggleLabel(event, label) {
    event.stopPropagation();
    this.contactsService.toggleLabel(this.contact, label);
  }

}
