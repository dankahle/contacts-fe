import {Injectable} from '@angular/core';
import {Store} from '../store/store';
import {UserService} from '../core/services/user-service';
import {ContactsService} from '../core/services/contacts.service';
import * as _ from 'lodash';
import 'rxjs/add/operator/do';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ContactEditComponent} from './main/contact-edit/contact-edit.component';
import {Util} from '../core/services/util';
import {ContactDetailComponent} from './main/contact-detail/contact-detail.component';
import {Observable} from 'rxjs/Observable';
import {Messages} from '../store/models/messages';
import {Contact} from '../store/models/contact';
import {MoreActionsComponent} from '../shared/components/more-actions/more-actions.component';
import {ContactDeleteComponent} from './main/contact-delete/contact-delete.component';

@Injectable()
export class ContactsPageService {

  constructor(private store: Store, private userService: UserService, private contactsService: ContactsService,
              private mdDialog: MatDialog) {
    // this is really only for store, i.e. store is the lowest on the hierarchy of modules, so can't see anything above (core, router, etc)
    // without there being a circular reference. We'll publish an event to get around that.
    store.subUpdateLabelCounts(contacts => this.updateLabelCounts());
    store.con.subContacts(contacts => this.updateLabelCounts());
  }

  // add/delete contacts will pass null in here
  updateLabelCounts() {
    if (!this.store.initialized) {
      return;
    }

    const contacts = this.store.con.contacts;
    this.store.usr.user.labels.forEach(label => {
      label.numContacts = 0;
      contacts.forEach(contact => {
        if (_.find(contact.labels, {id: label.id})) {
          label.numContacts++;
        }
      });
      // console.log(label.name, label.numContacts);
    });
  }

  openContactEdit(contact, mode) {

    const config = <MatDialogConfig>{
      width: '700px',
      height: '500px',
      backdropClass: 'bg-modal-backdrop',
      panelClass: 'contactDetailCssHack',
      data: {
        mode: mode,
        contact: {...contact},
      }
    }
    this.mdDialog.open(ContactEditComponent, config)
      .afterClosed().subscribe(_contact => {
      let api$: Observable<any>;
      if (_contact) {
        // throw new Error('edit submit not implemented');
        if (mode === 'add') {
          api$ = this.contactsService.addOne(_contact);
        } else {
          api$ = this.contactsService.updateOne(_contact);
        }

        // google's opening of detail after edit is annoying, screw that, but was not easy to do this as the circular
        // reference issue would only go away if you published the detail modal open
        api$.do(apiContact => {
          // this.store.con.pubOpenDetail(apiContact);
        })
          .subscribe(x => x);
      }
/*
      else if ((mode === 'edit') {
        this.store.con.pubOpenDetail(contact);
      }
*/
    });
  }

/*
// a roll your own modal with positioning for space issues. Was replaced by MatMenu
  openMoreActions(event, contact) {
    const width = 400,
      height = 400,
      sideOffset = 40,
      topOffset = 40;

    const settings = Util.getModalPosition(event, width, height, sideOffset, topOffset, 'left');

    const config = <MatDialogConfig>{
      width: width + 'px',
      height: settings.height + 'px',
      backdropClass: 'bg-modal-backdrop',
      position: {
        top: settings.top + 'px',
        left: settings.left + 'px',
      },
      data: {
        contact: {...contact},
      }
    }
    this.mdDialog.open(MoreActionsComponent, config)
      .afterClosed().subscribe(_contact => {
      let api$: Observable<any>;
      if (_contact) {
        this.contactsService.updateOne(_contact)
          .do(apiContact => {
            this.store.pubUpdateLabelCounts();
          })
          .subscribe(x => x);
      }
    });
  }
*/

}
