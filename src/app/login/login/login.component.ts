import {Component, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../core/services/user-service";
import {errorCodes} from "../../core/services/error-codes";

@Component({
  selector: 'dk-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  user = {};
  userNotFound = false;
  userAlreadyExists = false;
  path: string;

  constructor(protected route: ActivatedRoute, private userService: UserService, private router: Router) {
    route.url
      .subscribe(urlSegmentArr => this.path = urlSegmentArr[0].path);
  }

  login() {
    this.userNotFound = false;
    this.userService.login(this.user)
      .subscribe(user => {
        this.router.navigateByUrl('/');
      }, err => {
        this.userNotFound = true;
      })
  }

  register() {
    this.userAlreadyExists = false;
    this.userService.register(this.user)
      .subscribe(user => {
        this.router.navigateByUrl('/');
      }, err => {
        if (err.errorCode === errorCodes.server_prefix + errorCodes.user_already_exists) {
          this.userAlreadyExists = true;
        }
      })
  }

}
