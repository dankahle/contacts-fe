import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Globals} from '../../core/services/globals';
import {UserService} from '../../core/services/user-service';

@Component({
  selector: 'dk-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HeaderComponent {

  constructor(private userService: UserService, protected globals: Globals) {
  }

  logout() {
    this.userService.logout()
      .subscribe(x => x);
  }

}
