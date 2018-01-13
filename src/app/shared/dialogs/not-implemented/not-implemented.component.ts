import {Component, HostBinding, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'dk-not-implemented',
  templateUrl: './not-implemented.component.html',
  styleUrls: ['./not-implemented.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotImplementedComponent implements OnInit {
  @HostBinding('class.dkhost-not-implemented') hostClass = true;

  constructor() { }

  ngOnInit() {
  }

}
