import {Component, HostBinding, OnInit, ViewEncapsulation} from '@angular/core';
import {Store} from '../../../store/store';
import {LoginService} from '../../../login/login.service';

@Component({
  selector: 'dk-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
  log = console.log;
  @HostBinding('class.dkhost-header') hostClass = true;

  constructor(private loginService: LoginService, public store: Store) {}

  logout() {
    this.loginService.logout()
      .subscribe(x => x);
  }

}
