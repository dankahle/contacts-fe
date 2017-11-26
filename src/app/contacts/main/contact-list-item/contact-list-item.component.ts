import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Contact} from '../../../store/models/contact';
import {ContactListComponent} from '../contact-list/contact-list.component';

@Component({
  selector: 'dk-contact-list-item',
  templateUrl: './contact-list-item.component.html',
  styleUrls: ['./contact-list-item.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ContactListItemComponent {
  @Input() contact: Contact;

  constructor(protected parent: ContactListComponent) {
  }
}
