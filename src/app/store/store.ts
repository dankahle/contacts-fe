import {ApplicationRef, Injectable, NgZone} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {User} from './models/user';
import {StoreBase} from './store-base';
import {Subject} from 'rxjs/Subject';
import {Messages} from './models/messages';
import {Message} from './models/message';
import {Contact} from './models/contact';
import {Label} from './models/label';
import {ObservableMedia} from '@angular/flex-layout';
import {StoreUser} from './store-user';
import {StoreContacts} from './store-contacts';
import * as _ from 'lodash';
import 'rxjs/add/operator/first';

@Injectable()
/**
 * Store
 * @desc - inspired by redux, a global state pub/sub for state that needs to be global, not the kitchen sink.
 * Granular pub/sub so we don't have things being updated whenever anything changes, you can scope your updates
 * to the section change of interest. Not entirely applicable to this app (any user or contact change affects all),
 * but you get the point: don't update contact counts list when all you did was open the left nav.
 */
export class Store extends StoreBase {
  store$ = new BehaviorSubject<Store>(this);
  sub = this.store$.subscribe.bind(this.store$);
  usr: StoreUser;
  con: StoreContacts;

  authenticated = false;
  initialized = false;
  leftNavClosed = false;
  initialBreakpoint: string;
  selectedLabel?: Label;

  updateLabelCounts$ = new Subject();
  subUpdateLabelCounts = this.updateLabelCounts$.subscribe.bind(this.updateLabelCounts$);
  leftNavClosed$ = new BehaviorSubject(false);
  subLeftNavClosed = this.leftNavClosed$.subscribe.bind(this.leftNavClosed$);
  authenticated$ = new BehaviorSubject(this.authenticated);
  subAuthenticated = this.authenticated$.subscribe.bind(this.authenticated$);
  initialized$ = new BehaviorSubject(this.initialized);
  subInitialized = this.initialized$.subscribe.bind(this.initialized$);
  selectedLabelState$ = new BehaviorSubject(this.selectedLabel);
  subSelectedLabel = this.selectedLabelState$.subscribe.bind(this.selectedLabelState$);

  constructor(private media: ObservableMedia) {
    super();

    // setup substores
    this.usr = new StoreUser(this);
    this.usr.pub();
    this.con = new StoreContacts(this);
    this.con.pub();

    this.init();
  }

  pub() {
    this.store$.next(this);
  }

  init() {

    // close left nav
    if (this.media.isActive('xs') || this.media.isActive('sm')) {
      this.leftNavClosed = true;
    }

    this.media.asObservable()
      .first()
      .subscribe(change => {
        this.initialBreakpoint = change.mqAlias;
      });
  }

  pubLeftNavClosed(val) {
    this.leftNavClosed = val;
    this.leftNavClosed$.next(this.leftNavClosed);
    super.pub();
  }

  pubUpdateLabelCounts() {
    this.updateLabelCounts$.next();
  }

  pubAuthenticated(val) {
    this.authenticated = val;
    this.authenticated$.next(this.authenticated);
    super.pub();
  }

  pubInitialized(val) {
    this.initialized = val;
    this.initialized$.next(this.initialized);
    super.pub();
  }

  pubSelectedLabel(val) {
    this.selectedLabel = val;
    this.selectedLabelState$.next(this.selectedLabel);
    super.pub();
  }

}
