import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import {Init1, Init2, Init3, Init4, Init5} from '../../core/services/init-service';
import {merge} from 'rxjs/observable/merge';
import {Store} from '../../store/store';
import {ContactsService} from '../../core/services/contacts.service';
import {UserService} from '../../core/services/user-service';
import {Subject} from 'rxjs/Subject';
import {BreakpointService} from '../../core/services/breakpoint.service';
import * as _ from 'lodash';

@Injectable()
/**
 * InitializationGuard
 * desc - provide a complex hierarchy of initialization "before" app starts up including dependecies of dependencies
 */
export class InitializationGuard implements CanActivate {
  response$ = new Subject<boolean>();

  constructor(private store: Store,
              private route: ActivatedRoute,
              private userService: UserService,
              private contactsService: ContactsService,
              private breakpoints: BreakpointService,
              private init1: Init1,
              private init2: Init2,
              private init3: Init3,
              private init4: Init4,
              private init5: Init5) {

  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.handleCanActivate();
  }

  canActivateChild(next: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.handleCanActivate();
  }

  handleCanActivate() {
    if (this.store.authenticated && this.store.initialized) {
      return true;
    } else {
      const subscription = this.store.subAuthenticated(authenticated => {
        if (authenticated && !this.store.initialized) {
          this.init();
          subscription.unsubscribe();
        }
      });
      return this.response$;
    }
  }

  init() {
    // console.log('initguard start');

    // an example of a complex initialization flow with dependencies of dependencies
    Observable.forkJoin(this.contactsService.getAll(), this.init1.get(), this.init2.get())
      .mergeMap(arr => {
        this.store.con.pubContacts(arr[0]);

        return Observable.forkJoin(this.init3.get(), this.init4.get());
      })
      .mergeMap(x => {
        return Observable.forkJoin(this.init5.get());
      })
      .map(x => {
        // console.log('initguard done');
        this.store.pubInitialized(true);
        window['dkAppInitialized'] = true; // for e2e testing
        // console.log('app initialized');
        this.afterInit();
        this.response$.next(true);
        return true;
      })
      .catch(err => {
        this.response$.next(false);
        return Observable.throw(err);
      })
      .subscribe(x => x); // only need this cause we're not returning this function to canActivate
  }

  afterInit() {
    if (this.breakpoints.isActive('gt-sm')) {
      this.store.pubLeftNavClosed(false);
    }

    this.store.pubUpdateLabelCounts();
    this.route.params.subscribe(params => {
      const id = params.id;
    });
  }
}
