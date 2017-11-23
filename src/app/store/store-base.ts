import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {environment} from '../../environments/environment';
import {State} from './models/state';
import * as _ from 'lodash';

@Injectable()
export class StoreBase {
  state = new State();
  state$ = new BehaviorSubject(this.state);
  subscribe = this.state$.subscribe.bind(this.state$);
  logState = environment.logState;

  constructor() {
    if (this.logState === true) {
      console.log(this.state);
    }
  }

  // or just get it directly: store.state.xxx
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

}
