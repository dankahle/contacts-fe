import {Component, HostBinding, OnInit, ViewEncapsulation} from '@angular/core';
import {Store} from '../../../store/store';
import {Label} from '../../../store/models/label';
import {Router} from '@angular/router';
import {Util} from '../../../core/services/util';


@Component({
  selector: 'dk-leftnav',
  templateUrl: './leftnav.component.html',
  styleUrls: ['./leftnav.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LeftnavComponent {
  @HostBinding('class.closed') leftNavClosed;
  staticLabels = {
    contacts: <Label>{id: 'contacts', name: 'Contacts dfsdafdsa fasdf asd fasd fasd f', numContacts: 0},
    extras: [
      <Label>{id: 'settings', name: 'Settings'},
      <Label>{id: 'sendFeedback', name: 'Send Feedback'},
      <Label>{id: 'help', name: 'Help'}
    ]
  };
  selectedLabel = this.staticLabels.contacts;


  constructor(protected store: Store, protected router: Router) {
    // multiple ways to go here, some times the val will be deep in the hierarchy, and a path method would help
    // store.subscribe(state => this.leftNavClosed = state.leftNavClosed);
    // store.subscribe(state => this.leftNavClosed = state.getVal('leftNavClosed'));

    store.subscribe(state => {
      this.leftNavClosed = state.leftNavClosed;
    });
    store.subscribeContacts(contacts => {
      this.staticLabels.contacts.numContacts = contacts.length;
    });
  }

  handleLabel(label) {

    if (Util.isGuid(label.id)) {
      this.router.navigate(['/', label.id]);
      this.selectedLabel = label;
    }

    switch (label.id) {
      case 'contacts':
        this.router.navigateByUrl('/');
        this.selectedLabel = label;
        break;
      default:
        console.log(label.id);
        break;
    }
  }

  keydown(event, label) { // Trigger the click event from the keyboard
    if (Util.isKeydown(event)) {
      this.handleLabel(label);
    }
  }
}
