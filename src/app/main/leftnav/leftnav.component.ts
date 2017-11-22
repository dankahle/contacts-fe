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
    // multiple ways to go here, some times the val will be deep in the hierarchy, and a path method would help
    // store.subscribe(state => this.leftNavClosed = state.leftNavClosed);
    // store.subscribe(state => this.leftNavClosed = state.getVal('leftNavClosed'));
    store.subscribePath('leftNavClosed',  val => this.leftNavClosed = val);
  }


}
