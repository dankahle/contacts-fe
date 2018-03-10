import {Component, HostBinding, ViewEncapsulation} from '@angular/core';
import {Store} from './store/store';
import 'rxjs/add/operator/delay';
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
