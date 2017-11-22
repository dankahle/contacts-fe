import {Component, HostBinding, OnInit, ViewEncapsulation} from '@angular/core';
import {Globals} from '../../core/services/globals';
import {Store} from '../../core/services/store';

@Component({
  selector: 'dk-leftnav',
  templateUrl: './leftnav.component.html',
  styleUrls: ['./leftnav.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LeftnavComponent {

  @HostBinding('class.closed') leftNavClosed;

  constructor(private store: Store) {
    // store.subscribe(state => this.leftNavClosed = state.leftNavClosed);
    store.subscribe(state => this.leftNavClosed = state.getVal('leftNavClosed'));
  }


}
