import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Contact} from '../../../store/models/contact';
import {Store} from '../../../store/store';

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
  }

  updateDank() {
    const user = this.store.state.user;
    user.name = 'dank2';
    this.store.setUser(user);
  }
}
