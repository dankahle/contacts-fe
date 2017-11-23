import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {ContactsService} from '../contacts.service';
import {Contact} from '../../../store/models/contact';

@Injectable()
export class ContactListResolve implements Resolve<Contact[]> {

  constructor(private contactsService: ContactsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Contact[]> {
    // console.log('contact resolve start');
    return this.contactsService.getAll();
  }

}
