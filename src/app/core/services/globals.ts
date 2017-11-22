import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {environment} from '../../../environments/environment';
import {State} from '../models/state';
import {User} from '../models/user';
import * as _ from 'lodash';

@Injectable()
/**
 * Globals
 * @desc - inspired by redux, a global state components can subscribe to for changes and update. Instead of actions, reducers,
 * and epics (yuck), just a global service all share with update functions and publish() to notify of changes:
 * in component:
 * constructor(globals: Globals) {
 * globals.subscribe(state => this.leftNavClosed = state.leftNavClosed);
 * globals.subscribe(state => this.leftNavClosed = state.getVal('leftNavClosed'));
 * globals.subscribePath('leftNavClosed',  val => this.leftNavClosed = val);}
 * to set:
 * setVal(path:string, val) // uses lodash set for deep pathing
 * deleteVal(path:string)
 * to update, add an update function to Store and call it, then call publish() to publish to subscribers
 * THIS MUST BE A SINGLETON TO BE GLOBAL. It's possible you could have: Store, ContactsStore reusing the Store class with
 * different providers.
 * Can subscribe or subscribePath(path:string) to get updates
 */
export class Globals {
  state = new State();
  state$ = new BehaviorSubject(this.state);
  subscribe = this.state$.subscribe.bind(this.state$);
  logState = environment.logState;

  constructor() {
    if (this.logState === true) {
      console.log(this.state);
    }
  }

  // or just get it directly: globals.state.xxx
  getVal(path: string) {
    return _.get(this.state, path);
  }
  setVal(path: string, val) {
    _.set(this.state, path, val);
    this.publish();
    return this.state;
  }

  deleteVal(path: string) {
    _.set(this.state, path, undefined);
    this.publish();
  }

  publish() {
    this.state$.next(this.state);
    if (this.logState === true) {
      console.log(this.state);
    }
  }

  // subscribe method in properties list
  subscribePath(path: string, next?: (value: State) => void, error?: (error: any) => void, complete?: () => void) {
    this.state$
      .map(state => _.get(state, path))
      .subscribe(next, error, complete);
  }

}
