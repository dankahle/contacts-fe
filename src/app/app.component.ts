import {Component} from '@angular/core';
import {UserService} from './core/services/user-service';
import {Globals} from './core/services/globals';

@Component({
  selector: 'dk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(protected globals: Globals) {
  }

}
