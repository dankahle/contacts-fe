import * as _ from 'lodash';
import {User} from './user';
import {Contact} from './contact';

export class State {
  user?: User;
  contacts: Contact[] = [];
  initialized = false;
  leftNavClosed = false;

  getVal(path) {
    return _.get(this, path);
  }
}
