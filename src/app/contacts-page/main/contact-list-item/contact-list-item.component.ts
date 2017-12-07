import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Contact} from '../../../store/models/contact';
import {ContactListComponent} from '../contact-list/contact-list.component';
import {Util} from '../../../core/services/util';
import {ContactsPageService} from '../../contacts-page.service';

@Component({
  selector: 'dk-contact-list-item',
  templateUrl: './contact-list-item.component.html',
  styleUrls: ['./contact-list-item.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ContactListItemComponent {
  @Input() contact: Contact;

  constructor(protected parent: ContactListComponent, protected contactsPageService: ContactsPageService) {
  }

  moreActions(event, contact) {
    event.stopPropagation();
    if (Util.keydownAndNotEnterOrSpace(event)) {
      return;
    }
    this.contactsPageService.openMoreActions(event, contact)
  }

}
