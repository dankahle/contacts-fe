import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Contact} from '../../../store/models/contact';
import {ContactListComponent} from '../contact-list/contact-list.component';
import {Util} from '../../../core/services/util';
import {ContactsPageService} from '../../contacts-page.service';
import {Store} from '../../../store/store';
import {MatMenu, MatMenuTrigger} from '@angular/material';
import {ContactsService} from '../../../core/services/contacts.service';
import * as _ from 'lodash';
import {Label} from '../../../store/models/label';
import {UserService} from '../../../core/services/user-service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'dk-contact-list-item',
  templateUrl: './contact-list-item.component.html',
  styleUrls: ['./contact-list-item.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ContactListItemComponent {
  @Input() contact: Contact;
  @ViewChild(MatMenu) menu: MatMenu;
  @ViewChild(MatMenuTrigger) menuTrigger: MatMenuTrigger;
  labels: Label[];
  deleting: boolean;

  constructor(protected parent: ContactListComponent, protected contactsPageService: ContactsPageService,
              protected store: Store, protected contactsService: ContactsService) {
  }

  moreActions(event, contact) {
    event.stopPropagation();
    // this.contactsPageService.openMoreActions(event, contact);
    // this.contactsPageService.openMoreActionsMenu(event, contact);
    // this.store.publishMoreActionsMenu(event, contact);
  }

  menuClose() {
    if (!this.deleting) {
      this.contactsService.syncLabelsForApi(this.contact, this.labels)
        .subscribe(x => x);
    }
  }

  menuOpen() {
    this.deleting = false;
    this.labels = this.contactsService.getLabelsForMenu(this.contact);
  }

  removeLabelFromContact(event) {
    event.stopPropagation();
    this.contactsService.removeLabelFromContact(this.contact, this.store.state.selectedLabel)
      .subscribe(() => {
        // if we remove from label, the label may still be selected, then just gets readded, so we have to deselect it
        // as the sync runs after this
        _.find(this.labels, {id: this.store.state.selectedLabel.id}).selected = false;
        this.menuTrigger.closeMenu();
      });
  }

  deleteContact(event) {
    event.stopPropagation();
    this.contactsPageService.verifyContactDelete(this.contact)
      .subscribe(resp => {
        if (resp) {
          this.contactsService.deleteOne(this.contact.id)
            .subscribe(() => {
              this.deleting = true;
              this.menuTrigger.closeMenu();
            });
        }
      });
  }

  toggleLabel(event, label) {
    event.stopPropagation();
    const _label = _.find(this.labels, {id: label.id});
    _label.selected = !_label.selected;
  }

}
