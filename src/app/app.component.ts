import {Component, ViewEncapsulation} from '@angular/core';
import {UserService} from './core/services/user-service';
import {Globals} from './core/services/globals';

@Component({
  selector: 'dk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AppComponent {

  constructor(protected globals: Globals) {
  }

}
