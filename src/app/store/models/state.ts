import * as _ from 'lodash';
import {User} from './user';
import {Contact} from './contact';
import {Label} from './label';
import {ObservableMedia} from '@angular/flex-layout';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/first'

@Injectable()
export class State {
  user?: User;
  contacts: Contact[] = [];
  initialized = false;
  leftNavClosed = false;
  selectedLabel?: Label;
  initialBreakpoint: string;

  constructor(private media: ObservableMedia) {
    this.init();
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

  getVal(path) {
    return _.get(this, path);
  }
}
