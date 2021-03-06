import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
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

  login(user, stayLoggedIn) {
    let params;
    if (stayLoggedIn) {
      params = new HttpParams().set('stayLoggedIn', 'true');
    }

    return this.http.post<any>(environment.apiUrl + 'api/login', user, {params: params})
      .do(_user => this.store.usr.pubUser(_user));
  }

  logout() {
    return this.http.delete<any>(environment.apiUrl + 'api/login')
      .do(() => {
        this.store.deleteVal('user');
        this.store.pubAuthenticated(false);
        this.store.pubInitialized(false);
        this.store.pubLeftNavClosed(true);
        this.router.navigateByUrl('/login');
      });
  }

  register(user) {
    return this.http.post<any>(environment.apiUrl + 'api/register', user)
      .do(_user => this.store.usr.pubUser(_user));
  }

}

