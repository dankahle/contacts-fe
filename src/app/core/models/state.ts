import * as _ from 'lodash';

export class State {
  leftNavClosed?: boolean;

  getVal(path) {
    return _.get(this, path);
  }
}
