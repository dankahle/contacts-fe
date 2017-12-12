import {Store} from '../../store/store';
import {ContactsPageService} from '../contacts-page.service';
import {ContactsService} from '../../core/services/contacts.service';
import {ContactDeleteComponent} from './contact-delete/contact-delete.component';
import {MatDialog, MatDialogConfig, MatMenu, MatMenuTrigger} from '@angular/material';
import {Label} from '../../store/models/label';
import {Contact} from '../../store/models/contact';
import {Input, ViewChild} from '@angular/core';
import * as _ from 'lodash';

export class MoreActionsBase {
  contact: Contact;
  @ViewChild(MatMenu) menu: MatMenu;
  @ViewChild(MatMenuTrigger) menuTrigger: MatMenuTrigger;
  labels: Label[];
  deleting: boolean;

  constructor(protected store: Store, protected contactsService: ContactsService, private mdDialog: MatDialog) {
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
    const config = <MatDialogConfig>{
      height: '169px',
      backdropClass: 'bg-modal-backdrop',
      data: {
        contact: this.contact,
      }
    }
    return this.mdDialog.open(ContactDeleteComponent, config)
      .afterClosed()
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
