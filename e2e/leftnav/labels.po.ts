import {$, $$, browser, ElementFinder, protractor} from 'protractor';
import {CommonPO} from '../common.po';
import * as _ from 'lodash';

const EC = protractor.ExpectedConditions;

export class LabelPO extends CommonPO {
  labelContacts = $('dk-leftnav-label.contacts-label');
  labelAdd = $('dk-leftnav-label.add-label');
  qlabels = 'dk-leftnav-label.user-label';
  labels = $$(this.qlabels);
  extras = $$('dk-leftnav-label.extra-label');
  labelsHeader = $('mat-expansion-panel.user-labels mat-expansion-panel-header');
  qLabelsBody = 'mat-expansion-panel.user-labels .mat-expansion-panel-content';
  extrasHeader = $('mat-expansion-panel.extra-labels mat-expansion-panel-header');
  qExtrasBody = 'mat-expansion-panel.extra-labels .mat-expansion-panel-content';
  addedLabel = $$(this.qlabels).get(2); // label one, label two, Label Two2 label zthree, should order case insensitive

  clickEdit(el) {
    browser.actions().mouseMove(el).perform();
    el.$('.icon-edit').click();
  }

  clickDelete(el) {
    el.$('.icon-delete').click();
  }

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
        break;
      case 'extras':
        this.extrasHeader.click();
        break;
    }
  }

  closeAccordHeading(section) {

    switch (section) {
      case 'labels':
        this.labelsHeader.click();
        break;
      case 'extras':
        this.extrasHeader.click();
        break;
    }
  }

  addedLabelIsPresent(num) {
    return _.throttle(async () => {
      return await $$(this.qlabels).count() === num;
    }, 500);
  }

}
