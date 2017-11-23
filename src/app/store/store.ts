import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {environment} from '../../environments/environment';
import {State} from './models/state';
import {User} from './models/user';
import * as _ from 'lodash';
import {StoreBase} from './store-base';

@Injectable()
/**
 * Store
 * @desc - inspired by redux, a global state pub/sub for state that needs to be global, not the kitchen sink.
 * Granular pub/sub so we don't have things being updated whenever anything changes, you can scope your updates
 * to the section change of interest. Not entirely applicable to this app (any user or contact change affects all),
 * but you get the point: don't update contact counts list when all you did was open the left nav.
 */
export class Store extends StoreBase {

  userState$ = new BehaviorSubject(this.state.user);
  contactsState$ = new BehaviorSubject(this.state.contacts);
  subscribeUser = this.userState$.subscribe.bind(this.userState$);
  subscribeContacts = this.contactsState$.subscribe.bind(this.contactsState$);

  constructor() {
    super();
  }

  setUser(user: User) {
    this.state.user = user;
    this.publishUser();
  }

  setContacts(contacts) {
    this.state.contacts = contacts;
    this.publishContacts();
  }

  publishUser() {
    this.userState$.next(this.state.user);
    super.publish();
  }

  publishContacts() {
    this.contactsState$.next(this.state.contacts);
    super.publish();
  }

}
