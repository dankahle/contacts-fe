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

  login(user) {
    return this.http.post<any>(environment.apiUrl + 'api/login', user)
      .do(_user => this.store.setUser(_user));
  }

  logout() {
    return this.http.delete<any>(environment.apiUrl + 'api/login')
      .do(() => {
        this.store.deleteVal('user');
        this.store.setAuthenticated(false);
        this.store.setInitialized(false);
        this.router.navigateByUrl('/login');
      });
  }

  register(user) {
    return this.http.post<any>(environment.apiUrl + 'api/register', user)
      .do(_user => this.store.setUser(_user));
  }

}

