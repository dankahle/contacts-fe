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
export class AuthGuard implements CanActivate {
  initialized = false;

  constructor(private userService: UserService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.userService.isAuthenticated()) {
      return true;
    } else {
      return this.userService.getUser()
        .map(user => {
          return true;
        })
        .catch(err => {
          this.router.navigateByUrl('/login');
          return Observable.of(false);
        })
    }
  }
}
