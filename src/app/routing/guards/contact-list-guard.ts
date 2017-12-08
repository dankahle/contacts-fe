import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {UserService} from '../../core/services/user-service';
import {Store} from '../../store/store';

@Injectable()
/**
 * LoginGuard
 * desc - verifies user is logged in
 */
export class ContactListGuard implements CanActivate {

  constructor(private store: Store, private userService: UserService) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log('contactlistguard start');
    const labelId = next.params.id;
    if (labelId) {
      this.store.setVal('selectedLabel', this.userService.getLabelById(labelId));
    } else {
      this.store.deleteVal('selectedLabel');
    }
    return true;
  }

}
