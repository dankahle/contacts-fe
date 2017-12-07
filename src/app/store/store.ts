import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {User} from './models/user';
import {StoreBase} from './store-base';
import {Subject} from 'rxjs/Subject';
import {Messages} from './models/messages';
import {Message} from './models/message';
import {State} from './models/state';

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
  subscribeUser = this.userState$.subscribe.bind(this.userState$);
  contactsState$ = new BehaviorSubject(this.state.contacts);
  subscribeContacts = this.contactsState$.subscribe.bind(this.contactsState$);
  updateLabelCounts$ = new Subject();
  subscribeUpdateLabelCounts = this.updateLabelCounts$.subscribe.bind(this.updateLabelCounts$);
  leftNavClosed$ = new BehaviorSubject(false);
  subscribeLeftNavClosed = this.leftNavClosed$.subscribe.bind(this.leftNavClosed$);

  constructor(state: State) {
    super(state);
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

  publishUpdateLabelCounts() {
    this.updateLabelCounts$.next();
  }

  setLeftNavClosed(val) {
    this.state.leftNavClosed = val;
    this.leftNavClosed$.next(val);
    super.publish();
  }
}
