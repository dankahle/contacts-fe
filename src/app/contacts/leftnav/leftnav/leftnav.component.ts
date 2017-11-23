import {Component, HostBinding, OnInit, ViewEncapsulation} from '@angular/core';
import {Store} from '../../../store/store';
import {Label} from '../../../store/models/label';

@Component({
  selector: 'dk-leftnav',
  templateUrl: './leftnav.component.html',
  styleUrls: ['./leftnav.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LeftnavComponent {
  @HostBinding('class.closed') leftNavClosed;
  staticLabels = {
    contacts: <Label>{id: 'contacts', name: 'Contacts', numContacts: 0}
  }


  constructor(protected store: Store) {
    // multiple ways to go here, some times the val will be deep in the hierarchy, and a path method would help
    // store.subscribe(state => this.leftNavClosed = state.leftNavClosed);
    // store.subscribe(state => this.leftNavClosed = state.getVal('leftNavClosed'));

    store.subscribe(state => {
      this.leftNavClosed = state.leftNavClosed;
      this.staticLabels.contacts.numContacts = state.user.labels.length;
    });
    store.subscribeUser(user => this.staticLabels.contacts.numContacts = user.labels.length);
  }


}
