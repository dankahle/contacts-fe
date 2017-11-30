import {Injectable} from '@angular/core';
import {Store} from '../store/store';
import {UserService} from '../core/services/user-service';
import {ContactsService} from '../core/services/contacts.service';
import * as _ from 'lodash';
import 'rxjs/add/operator/do';

/**
 * ContactsUiService
 * @desc - we have a hierarchy of: store/routing << core << shared << comps << app
 * we'd like to put as much functionality in the services as possible, but always turns into a mess when
 * they need to "see" each other, the dreaded cyclic dependency issue. So we'll create services in the pages to answer
 * those issues. Some things would be more appropriate in the core (update labels on user), but if the userService needs
 * to user another service, then it gets bumped up to this level that can see core without concern of cyclic dependency.
 */
@Injectable()
export class ContactsPageService {

  constructor(private store: Store, private userService: UserService, private contactsService: ContactsService) {
    store.subscribeUpdateLabelCounts(contacts => this.updateLabelCounts(contacts));
  }

  updateLabelCounts(contacts) {

    // contacts.getAll will pass in contacts
    if (contacts) {
      this._updateLabelCounts(contacts);
    } else {
      this.contactsService.getAll()
        .do(_contacts => this._updateLabelCounts(_contacts))
        .subscribe(x => x);
    }
  }

  // add/delete contacts will pass null in here
  _updateLabelCounts(contacts) {
    const state = this.store.state;
    state.totalContacts = contacts.length;
    state.user.labels.forEach(label => {
      label.numContacts = 0;
      contacts.forEach(contact => {
        if (_.find(contact.labels, {id: label.id})) {
          label.numContacts++;
        }
      });
    });
  }

}
