import {Component, HostBinding, OnInit, ViewEncapsulation} from '@angular/core';
import {routeChangeAnimation} from '../../routing/animations';

@Component({
  selector: 'dk-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  animations: [ routeChangeAnimation ]
})
export class SplashComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  // @HostBinding('style.position')  position = 'absolute';

  constructor() { }

  ngOnInit() {
  }

}
