import {Component, HostBinding, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'dk-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SplashComponent implements OnInit {
  @HostBinding('class.dkhost-splash') hostClass = true;

  constructor() { }

  ngOnInit() {
  }

}
