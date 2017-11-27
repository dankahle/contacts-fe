import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import {Store} from '../store/store';


@Injectable()
export class LoginService {

  constructor(private http: HttpClient, private store: Store, private router: Router) {
  }

  login(_user) {
    return this.http.post<any>(environment.apiUrl + 'api/login', _user)
      .map(user => {
        this.store.setUser(user);
        return user;
      });
  }

  logout() {
    return this.http.delete<any>(environment.apiUrl + 'api/login')
      .map(() => {
        this.store.deleteVal('user');
        this.router.navigateByUrl('/login');
      });
  }

  register(_user) {
    return this.http.post<any>(environment.apiUrl + 'api/register', _user)
      .map(user => {
        this.store.setUser(user);
        return user;
      });
  }

}

