import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'dk-add-label',
  templateUrl: './add-label.component.html',
  styleUrls: ['./add-label.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AddLabelComponent {
label: string;
}
