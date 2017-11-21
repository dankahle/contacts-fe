import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Contact} from "../contacts.model";

@Component({
  selector: 'dk-contact-list-item',
  templateUrl: './contact-list-item.component.html',
  styleUrls: ['./contact-list-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContactListItemComponent {
@Input() contact: Contact
}
