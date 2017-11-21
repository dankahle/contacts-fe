import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import {Globals} from './globals';


@Injectable()
export class UserService {
  user: User;

  constructor(private http: HttpClient, private globals: Globals, private router: Router) {
  }

  isAuthenticated() {
    return !!this.globals.user;
  }

  getCurrentUser() {
    return this.globals.user;
  }

  getUserFromServer() {
    return this.http.get<User>(environment.apiUrl + 'api/login/current')
      .map(user => {
        this.globals.user = user;
        return user;
      })
  }

  login(_user) {
    return this.http.post<any>(environment.apiUrl + 'api/login', _user)
      .map(user => {
        this.globals.user = user;
        return user;
      })
  }

  logout() {
    return this.http.delete<any>(environment.apiUrl + 'api/login')
      .map(() => {
        this.globals.user = undefined;
        this.router.navigateByUrl('/login');
      })
  }

  register(_user) {
    return this.http.post<any>(environment.apiUrl + 'api/register', _user)
      .map(user => {
        this.globals.user = user;
        return user;
      })
  }

}

