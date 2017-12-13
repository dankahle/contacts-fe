import {ApplicationRef, Injectable, NgZone} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {environment} from '../../environments/environment';
import * as _ from 'lodash';
import {Message} from './models/message';
import {Messages} from './models/messages';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/filter';
import {Observable} from 'rxjs/Observable';
import {Store} from './store';

export class StoreBase {
  logState = environment.logState;
  messages$ = new Subject<Message>();

  constructor() {
    if (this.logState === true) {
      console.log(this);
    }
  }

  getVal(path: string) {
    return _.get(this, path);
  }

  setVal(path: string, val) {
    _.set(this, path, val);
    this.pub();
    return this;
  }

  deleteVal(path: string) {
    _.set(this, path, undefined);
    this.pub();
  }

  pub() {
/*
    if (this.logState === true) {
      console.log(this);
    }
*/
  }

  emit(messageName: Messages, payload: any) {
    this.messages$.next({name: messageName, payload});
  }

  onMessage(messageName: Messages, callback: (message: Message) => void) {
    this.messages$.filter(message => message.name === messageName).subscribe(callback);
  }

/*
  subPath<T>(path: string): Observable<T> {
    const subject = this.getOrCreateSubject<T>(path);
    // get last section of path after ".", then look for prop: section$ and if not there
    // add it and initialize to BehaviorSubject<T>
    return null;
  }

  pubPath<T>(path: string, val: T) {
    _.set(this, path, val);
    const subject = this.getOrCreateSubject<T>(path);
    subject.next(val);
    this.store$.next();
  }

  getOrCreateSubject<T>(path) {
    const varName = path + '$';
    if (!this[varName]) {
      this[varName] = new BehaviorSubject<T>(undefined);
    }
    return this[varName];
  }
*/

}
