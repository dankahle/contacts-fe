/*
* Mock async observables that return asynchronously.
* The observable either emits once and completes or errors.
*
* Must call `tick()` when test with `fakeAsync()`.
*
* THE FOLLOWING DON'T WORK
* Using `of().delay()` triggers TestBed errors;
* see https://github.com/angular/angular/issues/10127 .
*
* Using `asap` scheduler - as in `of(value, asap)` - doesn't work either.
*/
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import {Subject} from 'rxjs/Subject';

/*
Observable.of is sync, which doesnt' test out the async nature of these requests. Promise.resolve/reject on the other hand,
is async, they must do a setTimeout(() => deferred.resolve/reject), converting to observable, still get the async nature.
They need to add something similar to observable
 */
export function asyncData<T>(data: T) {
  return Observable.from(Promise.resolve(data));
}

export function asyncError<T>(errorObject?: any) {
  return Observable.from(Promise.reject(errorObject));
}

/* rolling your own: this should be adequate is it's a utility, not repeated code, so can justtify the whole subject thing easily
export function asyncData<T>(data: T) {
  return Observable.of(data).delay(0);
}

export function asyncError<T>(errorObject: any) {
  const subj = new Subject();
  setTimeout(() => subj.error(errorObject));
  return subj.asObservable();
}
*/

/* theirs was:
import { defer } from 'rxjs/observable/defer';

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

export function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}
 */

