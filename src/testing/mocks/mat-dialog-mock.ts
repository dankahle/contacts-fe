import {Observable} from 'rxjs/Observable';
import {asyncData, asyncError} from '../async-observable-helpers';
import createSpy = jasmine.createSpy;
import Spy = jasmine.Spy;
import {Subject} from 'rxjs/Subject';


export class MatDialogRefMock {
  subjClose = new Subject();
  subjBackdropClick = new Subject();
  subjKeydownEvents = new Subject();
  close = createSpy('close').and.callFake(this._close);
  afterClosed = createSpy('close').and.callFake(() => this.subjClose.asObservable());
  backdropClick = createSpy('backdropClick').and.callFake(() => this.subjBackdropClick.asObservable());
  keydownEvents = createSpy('keydownEvents').and.callFake(() => this.subjKeydownEvents.asObservable());

  _close(val) {
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
    const ref =  new MatDialogRefMock();
    setTimeout(() => ref.close(this.returnValue));
    return ref;
  }

}












