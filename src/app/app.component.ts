import {Component, HostBinding, ViewChild, ViewEncapsulation} from '@angular/core';
import {Store} from './store/store';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import {MatFormField, MatMenuTrigger} from '@angular/material';
import {Contact} from './store/models/contact';
import * as _ from 'lodash';
import * as $ from 'jquery';
import {environment} from '../environments/environment';

@Component({
  selector: 'dk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AppComponent {
  @HostBinding('@.disabled') animationsDisabled = environment.disableAnimations;
  @HostBinding('class.notransition') transitionDisabled = environment.disableAnimations;

  constructor(public store: Store) {
  }

}
