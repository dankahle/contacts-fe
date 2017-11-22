import {Component, HostBinding, OnInit, ViewEncapsulation} from '@angular/core';
import {Globals} from '../../core/services/globals';

@Component({
  selector: 'dk-leftnav',
  templateUrl: './leftnav.component.html',
  styleUrls: ['./leftnav.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LeftnavComponent {

  @HostBinding('class.closed') leftNavClosed;

  constructor(private globals: Globals) {
    // multiple ways to go here, some times the val will be deep in the hierarchy, and a path method would help
    // globals.subscribe(state => this.leftNavClosed = state.leftNavClosed);
    // globals.subscribe(state => this.leftNavClosed = state.getVal('leftNavClosed'));
    globals.subscribePath('leftNavClosed',  val => this.leftNavClosed = val);
  }


}
