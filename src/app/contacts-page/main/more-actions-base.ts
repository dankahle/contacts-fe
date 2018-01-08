import {Store} from '../../store/store';
import {ContactsPageService} from '../contacts-page.service';
import {ContactsService} from '../../core/services/contacts.service';
import {ContactDeleteComponent} from '../dialogs/contact-delete/contact-delete.component';
import {MatDialog, MatDialogConfig, MatMenu, MatMenuTrigger} from '@angular/material';
import {Label} from '../../store/models/label';
import {Contact} from '../../store/models/contact';
import {Input, ViewChild} from '@angular/core';
import * as _ from 'lodash';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

export class MoreActionsBase {
  contact: Contact;
  @ViewChild(MatMenu) menu: MatMenu;
  @ViewChild(MatMenuTrigger) menuTrigger: MatMenuTrigger;
  labels: Label[];
  deleting: boolean;

  constructor(public store: Store, protected contactsService: ContactsService, private mdDialog: MatDialog) {
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

  removeLabelFromContact(event): Observable<boolean> {
    const subject = new Subject<boolean>();
    event.stopPropagation();
    this.contactsService.removeLabelFromContact(this.contact, this.store.selectedLabel)
      .subscribe(() => {
        // if we remove from label, the label may still be selected, then just gets readded, so we have to deselect it
        // as the sync runs after this
        _.find(this.labels, {id: this.store.selectedLabel.id}).selected = false;
        this.menuTrigger.closeMenu();
        subject.next(true);
      });
    return subject;
  }

  deleteContact(event): Observable<boolean> {
    const subject = new Subject<boolean>();
    const config = <MatDialogConfig>{
      height: '169px',
      backdropClass: 'bg-modal-backdrop',
      data: {
        contact: this.contact,
      }
    };
    this.mdDialog.open(ContactDeleteComponent, config)
      .afterClosed()
      .subscribe(contact => {
        if (contact) {
          this.contactsService.deleteOne(this.contact.id)
            .subscribe(() => {
              this.deleting = true;
              this.menuTrigger.closeMenu();
              subject.next(true);
            });
        } else {
          subject.next(false);
        }
      });
    return subject;
  }

  toggleLabel(event, label) {
    event.stopPropagation();
    const _label = _.find(this.labels, {id: label.id});
    _label.selected = !_label.selected;
  }


}
