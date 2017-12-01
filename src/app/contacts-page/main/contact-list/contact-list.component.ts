import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Contact} from '../../../store/models/contact';
import {Store} from '../../../store/store';
import {Util} from '../../../core/services/util';

@Component({
  selector: 'dk-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ContactListComponent {
  contacts: Contact[];
  messageCount: number;

  constructor(route: ActivatedRoute, protected store: Store) {
    store.subscribeContacts(contacts => this.contacts = contacts);
    route.data.subscribe(data => {
      return this.contacts = data.contacts;
    });
  }

  editContact(event, contact, mode) {
    event.stopPropagation();
    if (Util.keydownAndNotEnterOrSpace(event)) {
      return;
    }
    console.log('edit', contact.name);

    // put up editContactComponent data.mode = mode
    // .do(contact => this.publishLabelContacts)
    //  if add contactsService.addContact(contact) else contactsService.updateContact(contact)

  }


}
