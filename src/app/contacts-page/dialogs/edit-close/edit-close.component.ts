import {Component, HostBinding, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'dk-edit-close',
  templateUrl: './edit-close.component.html',
  styleUrls: ['./edit-close.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditCloseComponent implements OnInit {
  @HostBinding('class.dkhost-edit-close') hostClass = true;

  constructor() { }

  ngOnInit() {
  }

}
