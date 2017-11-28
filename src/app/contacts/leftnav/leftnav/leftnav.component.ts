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
    contacts: <Label>{id: 'contacts', name: 'Contacts fsdfdsfadsfasdfasdfasdfsad', numContacts: 0},
    arrExtras: [
      <Label>{id: 'settings', name: 'Settings'},
      <Label>{id: 'sendFeedback', name: 'Send Feedback'},
      <Label>{id: 'help', name: 'Help'}
    ]
  };


  constructor(protected store: Store, protected router: Router) {
    store.setVal('selectedLabel', this.staticLabels.contacts);

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
      this.store.setVal('selectedLabel', label);
    } else {
      switch (label.id) {
        case 'contacts':
          this.router.navigateByUrl('/');
          this.store.setVal('selectedLabel', label);
          break;
        default:
          console.log(label.id);
          break;
      }
    }
  }

  keydown(event, label) { // Trigger the click event from the keyboard
    if (Util.isKeydown(event)) {
      this.handleLabel(label);
    }
  }
}
