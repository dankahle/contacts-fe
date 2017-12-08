import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Contact} from '../../store/models/contact';
import {ContactsService} from '../../core/services/contacts.service';
import {Store} from '../../store/store';
import * as _ from 'lodash';
import {UserService} from '../../core/services/user-service';


// not used, save for an example
/*
@Injectable()
export class ContactListResolve implements Resolve<Contact[]> {

  constructor(private userService: UserService, private contactsService: ContactsService, private store: Store) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Contact[]> {

    const labelId = route.params.id;
    if (labelId) {
      this.store.setVal('selectedLabel', this.userService.getLabelById(labelId));
      return Observable.of(this.store.state.contacts.filter(contact => _.find(contact.labels, {id: labelId})));
    } else {
      this.store.deleteVal('selectedLabel');
      return Observable.of(this.store.state.contacts);
    }

  }
}
*/
