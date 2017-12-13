import {Component, ElementRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {errorCodes} from '../../core/services/error-codes';
import {LoginService} from '../login.service';

@Component({
  selector: 'dk-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LoginComponent {
  @ViewChild('name', {read: ElementRef}) name;
  user = {name: '', company: ''};
  userNotFound = false;
  userAlreadyExists = false;
  path: string;
  stayLoggedIn = false;

  constructor(protected route: ActivatedRoute, private loginService: LoginService, private router: Router) {
    route.url
      .subscribe(urlSegmentArr => this.path = urlSegmentArr[0].path);
  }

  ngAfterViewInit() {
    this.name.nativeElement.focus();
  }

  inputChange() {
    this.userNotFound = false;
    this.userAlreadyExists = false;
  }

  login() {
    this.userNotFound = false;
    // I can't believe I have to trim these. ng-model used to trim all input
    this.user.name = this.user.name.trim();
    this.user.company = this.user.company.trim();
    this.loginService.login(this.user, this.stayLoggedIn)
      .subscribe(user => {
        this.router.navigateByUrl('/');
      }, err => {
        this.userNotFound = true;
      });
  }

  register() {
    this.userAlreadyExists = false;
    this.loginService.register(this.user)
      .subscribe(user => {
        this.router.navigateByUrl('/');
      }, err => {
        if (err.errorCode === errorCodes.server_prefix + errorCodes.user_already_exists) {
          this.userAlreadyExists = true;
        }
      });
  }

}
