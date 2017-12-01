import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, Resolve} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {ContactsService} from '../../core/services/contacts.service';
import {Contact} from '../../store/models/contact';
import {UserService} from '../../core/services/user-service';
import {Store} from '../../store/store';

@Injectable()
export class ContactListResolve implements Resolve<Contact[]> {

  constructor(private contactsService: ContactsService, private userService: UserService, private store: Store) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Contact[]> {
    // console.log('contact resolve start');
    if (route.params.id) {
      return this.contactsService.getAll(route.params.id, true);
    } else {
      return this.contactsService.getAll(null, true);
    }
  }

}
