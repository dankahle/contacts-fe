import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Contact} from '../../../store/models/contact';
import {ContactListComponent} from '../contact-list/contact-list.component';
import {Util} from '../../../core/services/util';
import {ContactsPageService} from '../../contacts-page.service';
import {Store} from '../../../store/store';
import {MatDialog, MatMenu, MatMenuTrigger} from '@angular/material';
import {ContactsService} from '../../../core/services/contacts.service';
import * as _ from 'lodash';
import {Label} from '../../../store/models/label';
import {UserService} from '../../../core/services/user-service';
import {Observable} from 'rxjs/Observable';
import {MoreActionsBase} from '../more-actions-base';

@Component({
  selector: 'dk-contact-list-item',
  templateUrl: './contact-list-item.component.html',
  styleUrls: ['./contact-list-item.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ContactListItemComponent extends MoreActionsBase {
  @Input() contact: Contact;
  Util = Util;

  constructor(protected parent: ContactListComponent, protected contactsPageService: ContactsPageService,
              store: Store, contactsService: ContactsService, mdDialog: MatDialog) {
    super(store, contactsService, mdDialog);
  }

}
