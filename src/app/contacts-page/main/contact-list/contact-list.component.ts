import {AfterViewInit, Component, HostBinding, OnDestroy, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Contact} from '../../../store/models/contact';
import {Store} from '../../../store/store';
import {Util} from '../../../core/services/util';
import * as _ from 'lodash';
import {UserService} from '../../../core/services/user-service';
import {ContactsPageService} from '../../contacts-page.service';
import {ContactDetailComponent} from '../../dialogs/contact-detail/contact-detail.component';
import {MatDialog, MatDialogConfig, MatMenuTrigger} from '@angular/material';
import {Messages} from '../../../store/models/messages';
import {BreakpointService} from '../../../core/services/breakpoint.service';
import {Subscription} from 'rxjs/Subscription';
import {routeChangeAnimation} from '../../../routing/animations';

@Component({
  selector: 'dk-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  animations: [ routeChangeAnimation ]
})
export class ContactListComponent implements OnDestroy, AfterViewInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.max-width') hostMaxWidth;
  contacts: Contact[] = [];
  messageCount: number;
  subs_selectedLabel: Subscription;
  subs_Contacts: Subscription;

  constructor(private route: ActivatedRoute, protected store: Store, protected userService: UserService,
              protected contactsPageService: ContactsPageService, private mdDialog: MatDialog) {

    this.subs_selectedLabel = this.store.subSelectedLabel(label => this.syncContacts());
    this.subs_Contacts = this.store.con.subContacts(label => this.syncContacts());

/*
    // an example of a dynamic hostBinding property
    this.store.leftNavClosed$.subscribe(leftnavClosed => {
      if (leftnavClosed || breakpoints.isActive('lt-md')) {
        this.hostMaxWidth = '100%';
      } else {
        this.hostMaxWidth = 'calc(100% - 284px)';
      }
    });
*/

  } // const

  ngAfterViewInit() {
    window['dkContactListInitialized'] = true; // for e2e testing
    // console.log('list afterviewinit');
  }

  ngOnDestroy() {
    this.subs_selectedLabel.unsubscribe();
    this.subs_Contacts.unsubscribe();
  }

  syncContacts() {
    if (this.store.selectedLabel) {
      this.contacts = this.store.con.contacts.filter(contact =>
        _.find(contact.labels, {id: this.store.selectedLabel.id}));
    } else {
      this.contacts = this.store.con.contacts;
    }
  }

  editContact(event, contact, mode) {
    event.stopPropagation();
    if (Util.keydownAndNotEnterOrSpace(event)) {
      return;
    }
    this.contactsPageService.openContactEdit(contact, mode);
  }

  openContactDetail(event, contact) {
    event.stopPropagation();
    if (Util.keydownAndNotEnterOrSpace(event)) {
      return;
    }
    this.store.con.pubOpenDetail(contact);
  }

}
