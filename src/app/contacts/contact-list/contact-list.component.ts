import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Store} from '../../core/services/store';
import {ActivatedRoute} from '@angular/router';
import {Contact} from '../contacts.model';

@Component({
  selector: 'dk-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContactListComponent {
  contacts: Contact[];
  messageCount: number;

  constructor(route: ActivatedRoute) {
    route.data.subscribe(data => {
      return this.contacts = data.contacts;
    });
  }

}
