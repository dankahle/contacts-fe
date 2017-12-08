import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {User} from '../../store/models/user';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import {Router} from '@angular/router';
import {Store} from '../../store/store';
import * as _ from 'lodash';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class UserService {

  constructor(private http: HttpClient, private store: Store, private router: Router) {
  }

  isAuthenticated() {
    return !!this.store.state.user;
  }

  getUser() {
    return this.http.get<User>(environment.apiUrl + 'api/login/current')
      .do(user => {
        this.store.setUser(user);
      })
      .catch(e => {
        return Observable.of(e);
      })
  }

  addUser(user) {
    return this.http.post<User>(`${environment.apiUrl}api/users`, user)
      .do(_user => this.store.setUser(_user));
  }

  updateUser(user) {
    return this.http.put<User>(`${environment.apiUrl}api/users/${user.id}`, user)
      .do(_user => this.store.setUser(_user));
  }

  deleteLabel(user, label) {
    user.labels.splice(_.findIndex(user.labels, {id: label.id}), 1);
    return this.updateUser(user);

  }

  getLabelById(id) {
    return _.find(this.store.state.user.labels, {id: id});
  }

}

