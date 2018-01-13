import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
  selector: 'dk-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  @HostBinding('class.dkhost-page-not-found') hostClass = true;

  constructor() {
  }

  ngOnInit() {
  }

}
