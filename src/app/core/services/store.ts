import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {environment} from '../../../environments/environment';
import {INITIAL_STATE, InitialState} from '../models/initial-state';
import {User} from '../models/user';

@Injectable()
/**
 * Store
 * @desc - inspired by redux, a global state components can subscribe to for changes and update. Instead of actions, reducers,
 * and epics (yuck), just a global service all share with update functions and publish() to notify of changes:
 * in component:
 * constructor(store Store) { store.subscribe(state => this.someval = state.someval); }
 * to update, add an update function to Store and call it, then call publish() to publish to subscribers
 * THIS MUST BE A SINGLETON TO BE GLOBAL. It's possible you could have: Store, ContactsStore reusing the Store class with
 * different providers.
 */
export class Store {
  state: InitialState = INITIAL_STATE;
  state$ = new BehaviorSubject(this.state);
  subscribe = this.state$.subscribe.bind(this.state$);
  logState = environment.logState;

  constructor() {
    if (this.logState === true) {
      console.log(this.state);
    }
  }

  updateUser(user: User) {
    this.state.user = user;
    this.publish();
  }

  publish() {
    this.state$.next(this.state);
    if (this.logState === true) {
      console.log(this.state);
    }
  }

}
