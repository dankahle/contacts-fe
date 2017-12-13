import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {UserService} from '../../core/services/user-service';
import {Store} from '../../store/store';
import {Subject} from 'rxjs/Subject';

@Injectable()
/**
 * LoginGuard
 * desc - verifies user is logged in
 */
export class ContactListGuard implements CanActivate {
  response$ = new Subject<boolean>();

  constructor(private store: Store, private userService: UserService) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.store.initialized) {
      this.doWork(next, state);
      return true;
    } else {
      const subscription = this.store.subInitialized(initialized => {
        if (initialized) {
          this.doWork(next, state);
          subscription.unsubscribe();
        }
      });
      return this.response$;
    }
  }

  doWork(next, state) {
    // console.log('contactlistguard start');
    const labelId = next.params.id;
    if (labelId) {
      this.store.pubSelectedLabel(this.userService.getLabelById(labelId));
    } else {
      this.store.pubSelectedLabel(undefined);
    }
    // console.log('contactlistguard end');
    this.response$.next(true);
    return true;
  }
}
