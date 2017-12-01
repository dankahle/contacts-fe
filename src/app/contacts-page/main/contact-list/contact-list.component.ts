import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Contact} from '../../../store/models/contact';
import {Store} from '../../../store/store';
import {Util} from '../../../core/services/util';
import * as _ from 'lodash';
import {UserService} from '../../../core/services/user-service';

@Component({
  selector: 'dk-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ContactListComponent {
  contacts: Contact[] = [];
  messageCount: number;

  constructor(private route: ActivatedRoute, protected store: Store, protected userService: UserService) {
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
    console.log('edit', contact.name);

    // put up editContactComponent data.mode = mode
    // .do(contact => this.publishLabelContacts)
    //  if add contactsService.addContact(contact) else contactsService.updateContact(contact)

  }


}
