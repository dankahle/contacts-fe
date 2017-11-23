import {Component, ViewEncapsulation} from '@angular/core';
import {Store} from './store/store';

@Component({
  selector: 'dk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AppComponent {

  constructor(protected store: Store) {
  }

}
