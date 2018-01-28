import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {Store} from './store/store';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import {MatFormField, MatMenuTrigger} from '@angular/material';
import {Contact} from './store/models/contact';
import * as _ from 'lodash';
import * as $ from 'jquery';

@Component({
  selector: 'dk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AppComponent {

  constructor(public store: Store) {
  }



}
