import * as _ from 'lodash';
import {User} from './user';
import {Contact} from './contact';
import {Label} from './label';

export class State {
  user?: User;
  contacts: Contact[] = [];
  initialized = false;
  leftNavClosed = window.innerWidth < 768 ? true : false;
  selectedLabel?: Label;

  getVal(path) {
    return _.get(this, path);
  }
}
