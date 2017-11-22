import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {environment} from '../../../environments/environment';
import {State} from '../models/state';
import {User} from '../models/user';
import * as _ from 'lodash';

@Injectable()
/**
 * Store
 * @desc - inspired by redux, a global state components can subscribe to for changes and update. Instead of actions, reducers,
 * and epics (yuck), just a global service all share with update functions and publish() to notify of changes:
 * in component:
 * constructor(store Store) { store.subscribe(state => this.someval = state.someval or state.getVal('path') }
 * to update, add an update function to Store and call it, then call publish() to publish to subscribers
 * THIS MUST BE A SINGLETON TO BE GLOBAL. It's possible you could have: Store, ContactsStore reusing the Store class with
 * different providers.
 */
export class Store {
  state = new State();
  state$ = new BehaviorSubject(this.state);
  subscribe = this.state$.subscribe.bind(this.state$);
  logState = environment.logState;

  constructor() {
    if (this.logState === true) {
      console.log(this.state);
    }
  }

  getVal(path) {
    return _.get(this.state, path);
  }
  setVal(path, val) {
    _.set(this.state, path, val);
    this.publish();
    return this.state;
  }

  setState(state) {
    this.state = state;
    this.publish();
    return this.state;
  }

  publish() {
    this.state$.next(this.state);
    if (this.logState === true) {
      console.log(this.state);
    }
  }

  subscribePath(path: string, next?: (value: State) => void, error?: (error: any) => void, complete?: () => void) {
    this.state$
      .map(state => _.get(state, path))
      .subscribe(next, error, complete);
  }

}
