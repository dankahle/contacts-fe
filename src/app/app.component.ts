import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {Store} from './store/store';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import {MatMenuTrigger} from '@angular/material';
import {Contact} from './store/models/contact';

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
