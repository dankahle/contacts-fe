import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Store} from '../../../store/store';
import {LoginService} from '../../../login/login.service';

@Component({
  selector: 'dk-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HeaderComponent {
  log = console.log;

  constructor(private loginService: LoginService, protected store: Store) {}

  logout() {
    this.loginService.logout()
      .subscribe(x => x);
  }

}
