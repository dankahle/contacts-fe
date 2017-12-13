import {Contact} from './models/contact';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Store} from './store';
import {StoreBase} from './store-base';

export class StoreContacts extends StoreBase {
  con$ = new BehaviorSubject<StoreContacts>(this);
  sub = this.con$.subscribe.bind(this.con$);
  contacts: Contact[] = [];

  contacts$ = new BehaviorSubject(this.contacts);
  subContacts = this.contacts$.subscribe.bind(this.contacts$);


  constructor(public store: Store) {
    super();
    this.store = store;
  }

  pub() {
    this.con$.next(this);
    this.store.pub();
  }

  pubContacts(contacts: Contact[]) {
    this.contacts = contacts;
    this.contacts$.next(this.contacts);
    this.pub();
    this.store.pubUpdateLabelCounts();
  }

}
