import {ApplicationRef, Injectable, NgZone} from '@angular/core';
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
  authenticatedState$ = new BehaviorSubject(this.state.authenticated);
  subscribeAuthenticated = this.authenticatedState$.subscribe.bind(this.authenticatedState$);
  initializedState$ = new BehaviorSubject(this.state.initialized);
  subscribeInitialized = this.initializedState$.subscribe.bind(this.initializedState$);
  selectedLabelState$ = new BehaviorSubject(this.state.selectedLabel);
  subscribeSelectedLabel = this.selectedLabelState$.subscribe.bind(this.selectedLabelState$);

  constructor(state: State) {
    super(state);
  }

  setUser(user: User) {
    this.state.user = user;
    this.publishUser();
  }

  publishUser() {
    this.userState$.next(this.state.user);
    super.publish();
  }

  setContacts(contacts) {
    this.state.contacts = contacts;
    this.publishContacts();
  }

  publishContacts() {
    this.contactsState$.next(this.state.contacts);
    super.publish();
  }

  setLeftNavClosed(val) {
    this.state.leftNavClosed = val;
    this.publishLeftNavClosed();
  }

  publishLeftNavClosed() {
    this.leftNavClosed$.next(this.state.leftNavClosed);
    super.publish();
  }

  publishUpdateLabelCounts() {
    this.updateLabelCounts$.next();
  }

  setAuthenticated(val) {
    this.state.authenticated = val;
    this.publishAuthenticated();
  }

  publishAuthenticated() {
    this.authenticatedState$.next(this.state.authenticated);
    super.publish();
  }

  setInitialized(val) {
    this.state.initialized = val;
    this.publishInitialized();
  }

  publishInitialized() {
    this.initializedState$.next(this.state.initialized);
    super.publish();
  }

  setSelectedLabel(val) {
    this.state.selectedLabel = val;
    this.publishSelectedLabel();
  }

  publishSelectedLabel() {
    this.selectedLabelState$.next(this.state.selectedLabel);
    super.publish();
  }

}
