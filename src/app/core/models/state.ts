import * as _ from 'lodash';
import {User} from './user';

export class State {
  user?: User;
  initialized: boolean;
  leftNavClosed = true;

  getVal(path) {
    return _.get(this, path);
  }
}
