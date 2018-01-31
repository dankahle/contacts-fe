import {$, $$, browser, ElementFinder, protractor} from 'protractor';
import {CommonPO} from '../common.po';

const EC = protractor.ExpectedConditions;

export class LabelPO extends CommonPO {
  labelContacts = $('dk-leftnav-label');
  labels = $$('mat-expansion-panel:nth-of-type(1) dk-leftnav-label');
  extras = $$('mat-expansion-panel:nth-of-type(2) dk-leftnav-label');
  labelsHeader = $('mat-expansion-panel:nth-of-type(1) mat-expansion-panel-header');
  qLabelsBody = 'mat-expansion-panel:nth-of-type(1) .mat-expansion-panel-content';
  extrasHeader = $('mat-expansion-panel:nth-of-type(2) mat-expansion-panel-header');
  qExtrasBody = 'mat-expansion-panel:nth-of-type(2) .mat-expansion-panel-content';

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

  openAccordHeading(section) {

    switch (section) {
      case 'labels':
        this.labelsHeader.click();
        browser.wait(EC.visibilityOf($(this.qLabelsBody)))
        break;
      case 'extras':
        this.extrasHeader.click();
        browser.wait(EC.visibilityOf($(this.qExtrasBody)))
        break;
    }
  }

  closeAccordHeading(section) {

    switch (section) {
      case 'labels':
        this.labelsHeader.click();
        browser.wait(EC.invisibilityOf($(this.qLabelsBody)))
        break;
      case 'extras':
        this.extrasHeader.click();
        browser.wait(EC.invisibilityOf($(this.qExtrasBody)))
        break;
    }
  }


}
