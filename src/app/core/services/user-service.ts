import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {User} from '../../store/models/user';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import {Store} from '../../store/store';
import {State} from '../../store/models/state';


@Injectable()
export class UserService {

  constructor(private http: HttpClient, private store: Store, private router: Router) {
    // we want to update the counts only when user or contacts change, not whenever anything changes.
    store.subscribeUser(user => this.updateLabelCounts(store.state));
    store.subscribeContacts(contacts => this.updateLabelCounts(store.state));
  }

  isAuthenticated() {
    return !!this.store.state.user;
  }

  getUser() {
    return this.http.get<User>(environment.apiUrl + 'api/login/current')
      .map(user => {
        this.store.setUser(user);
        return user;
      });
  }

  updateLabelCounts(state: State) {
    // foreach state.contacts, inc appropriate label counts
    console.log('updatelabelcounts');
  }

}

