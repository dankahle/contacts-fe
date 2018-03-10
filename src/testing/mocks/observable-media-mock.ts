import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export class ObservableMediaMock {
  breakpoint: number;
  subj = new BehaviorSubject({mqMedia: this.breakpoint});
  _isActive: string;

  constructor() {
    this.publish(window.innerWidth);
  }

  isActive(bp) {
    return bp === this._isActive;
  }

  setIsActive(bp) {
    this._isActive = bp;
  }

  subscribe(...val) {
    this.subj.subscribe(...val);
  }

  publish(bp) {
    if (bp) {
      this.breakpoint = bp;
    }
    this.subj.next({mqMedia: this.breakpoint});
  }

  asObservable() {
    return this.subj.asObservable();
  }

}
