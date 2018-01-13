import {Component, ElementRef, HostBinding, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Label} from '../../../store/models/label';
import {LeftnavComponent} from '../leftnav/leftnav.component';
import {Store} from '../../../store/store';

@Component({
  selector: 'dk-leftnav-label',
  templateUrl: './leftnav-label.component.html',
  styleUrls: ['./leftnav-label.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LeftnavLabelComponent {
  @HostBinding('class.dkhost-leftnav-label') hostClass = true;
  @Input() label: Label;
  log = console.log;

  constructor(protected elemRef: ElementRef, protected leftnav: LeftnavComponent,
              protected parent: LeftnavComponent, public store: Store) {
  }

}
