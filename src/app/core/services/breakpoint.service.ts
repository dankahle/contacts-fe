import {ObservableMedia} from '@angular/flex-layout';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import {environment} from '../../../environments/environment';

export enum BreakpointDirection {
  initial = 1,
  fromBelow,
  fromAbove
}

export class BreakpointChange {
  constructor(public breakpoint: string, public direction: BreakpointDirection) {}
}

@Injectable()
export class BreakpointService {
  breakpoints$: BehaviorSubject<BreakpointChange>;
  subscribe: any;
  lastBreakpoint: string;

  constructor(private media: ObservableMedia) {
    console.log('breakpoint service const');
    media.asObservable()
      .subscribe(change => {
        this.handleBreakpoints(change.mqAlias);
      });
  }

  isActive(val) {
    return this.media.isActive(val);
  }

  handleBreakpoints(breakpoint) {
    let direction: BreakpointDirection;
    // console.log(`${this.lastBreakpoint} >> ${breakpoint}`);

    if (this.lastBreakpoint === undefined) {
      // hack: how to create a behaviorSubject but you don't have the value till later? Have to create it then
      this.breakpoints$ = new BehaviorSubject<BreakpointChange>(new BreakpointChange(breakpoint, BreakpointDirection.initial));
      this.subscribe = this.breakpoints$.subscribe.bind(this.breakpoints$);
    } else {
      switch (breakpoint) {
        case 'xs':
            direction = BreakpointDirection.fromAbove;
          break;
        case 'sm':
          if (_.includes(['xs'], this.lastBreakpoint)) {
            direction = BreakpointDirection.fromBelow;
          } else {
            direction = BreakpointDirection.fromAbove;
          }
          break;
        case 'md':
          if (_.includes(['xs', 'sm'], this.lastBreakpoint)) {
            direction = BreakpointDirection.fromBelow;
          } else {
            direction = BreakpointDirection.fromAbove;
          }
          break;
        case 'lg':
          if (_.includes(['xs', 'sm', 'md'], this.lastBreakpoint)) {
            direction = BreakpointDirection.fromBelow;
          } else {
            direction = BreakpointDirection.fromAbove;
          }
          break;
        case 'xl':
            direction = BreakpointDirection.fromBelow;
          break;
      }
      this.breakpoints$.next(new BreakpointChange(breakpoint, direction));
        // console.log(`breakpoint: ${breakpoint} ${BreakpointDirection[direction]}`);
    }

    this.lastBreakpoint = breakpoint;

  }

}
