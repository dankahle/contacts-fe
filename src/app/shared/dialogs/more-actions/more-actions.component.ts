import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Store} from '../../../store/store';
import {Contact} from '../../../store/models/contact';
import {MatMenu, MatMenuTrigger} from '@angular/material';

@Component({
  selector: 'dk-more-actions',
  templateUrl: './more-actions.component.html',
  styleUrls: ['./more-actions.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class MoreActionsComponent {
  @ViewChild('moreActionsTrigger') trigger: MatMenuTrigger;
  @ViewChild('MatMenu') menu: MatMenu;
  event: MouseEvent;
  contact: Contact;

  constructor(protected store: Store) {
/*
    store.subscribeMoreActionsMenu((event, contact) => {
      this.event = event;
      this.contact = contact;
      // this.menu.position = event.clientX;
      this.trigger.openMenu();
    });
*/
  }

}
