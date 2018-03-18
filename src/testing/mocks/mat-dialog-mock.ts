/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />
import {Observable} from 'rxjs/Observable';
import {asyncData, asyncError} from '../async-observable-helpers';
import createSpy = jasmine.createSpy;
import Spy = jasmine.Spy;
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/first';


export class MatDialogRefMock {
  subjClose = new Subject();
  subjBackdropClick = new Subject();
  subjKeydownEvents = new Subject();
  close = createSpy('close');
  afterClosed = createSpy('close').and.callFake(() => this.subjClose.asObservable().first());
  backdropClick = createSpy('backdropClick').and.callFake(() => this.subjBackdropClick.asObservable());
  keydownEvents = createSpy('keydownEvents').and.callFake(() => this.subjKeydownEvents.asObservable());

  doClose(val) {
    this.subjClose.next(val);
    this.subjClose.complete();
  }

  doBackdropClick(val) {
    this.subjBackdropClick.next(val);
    this.subjBackdropClick.complete();
  }

  doKeydownEvents(val) {
    this.subjKeydownEvents.next(val);
    this.subjKeydownEvents.complete();
  }

}

export class MatDialogMock {
  returnValue;

  open: any = createSpy('open').and.callFake(this._open);

  _open(): MatDialogRefMock {
    const ref = new MatDialogRefMock();
    setTimeout(() => {
      ref.doClose(this.returnValue);
    });
    return ref;
  }

}












