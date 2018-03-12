import {Observable} from 'rxjs/Observable';
import {asyncData, asyncError} from '../async-observable-helpers';
import createSpy = jasmine.createSpy;
import Spy = jasmine.Spy;
import {Subject} from 'rxjs/Subject';


export class MatDialogRefMock {
  close = createSpy('close').and.callFake(this._close);
  afterClosed = createSpy('close').and.callFake(this._afterClosed);
  subj = new Subject();

  _close(data) {
    this.subj.next(data);
    this.subj.complete();
  }

  _afterClosed() {
    return this.subj.asObservable();
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












