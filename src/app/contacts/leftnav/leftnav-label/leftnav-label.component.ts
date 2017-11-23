import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Label} from '../../../store/models/label';

@Component({
  selector: 'dk-leftnav-label',
  templateUrl: './leftnav-label.component.html',
  styleUrls: ['./leftnav-label.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LeftnavLabelComponent {
  @Input() label: Label;


}
