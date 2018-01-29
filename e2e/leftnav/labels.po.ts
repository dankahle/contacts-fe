import {$, $$, browser, ElementFinder, protractor} from 'protractor';


export class LabelPO {
  labelContacts = $('dk-leftnav-label');
  labels = $('mat-expansion-panel:nth-of-type(1) dk-leftnav-label');
  extras = $('mat-expansion-panel:nth-of-type(2) dk-leftnav-label');

  clickLabel(section, position) {
    switch (section) {
      case 'contacts':
        this.labelContacts.click();
        break;
      case 'labels':
        this.labels[position].click();
        break;
      case 'extras':
        this.extras[position].click();
        break;
    }
  }


}
