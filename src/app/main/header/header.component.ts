import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Globals} from '../../core/services/globals';
import {UserService} from '../../core/services/user-service';
import {Store} from '../../core/services/store';

@Component({
  selector: 'dk-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HeaderComponent {

  constructor(private userService: UserService, protected globals: Globals, protected store: Store) {
    store.subscribe();
  }

  logout() {
    this.userService.logout()
      .subscribe(x => x);
  }

}
