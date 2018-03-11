import {Observable} from 'rxjs/Observable';
import {asyncData, asyncError} from '../async-observable-helpers';
import createSpy = jasmine.createSpy;
import Spy = jasmine.Spy;
import {Subject} from 'rxjs/Subject';


export class MatDialogRefMock {
  subj = new Subject();

  close(data) {
    this.subj.next(data);
    this.subj.complete();
  }

  afterClosed() {
    return this.subj.asObservable();
  }
}


export class MatDialogMock {
  returnValue;

  open(): MatDialogRefMock {
    const ref =  new MatDialogRefMock();
    setTimeout(ref.close(this.returnValue));
    return ref;
  }

  // open: any = createSpy('open', this._open);

}












