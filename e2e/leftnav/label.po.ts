import {$, $$, browser, ElementFinder, protractor} from 'protractor';
import {CommonPO} from '../common.po';
import * as _ from 'lodash';
import {LabelEditPO} from '../dialogs/label-edit.po';
import {LabelDeletePO} from '../dialogs/label-delete.po';

const EC = protractor.ExpectedConditions;
const poLabelEdit = new LabelEditPO();
const poLabelDelete = new LabelDeletePO;

export class LabelPO extends CommonPO {
  labelContacts = $('dk-leftnav dk-leftnav-label.contacts-label');
  labelAdd = $('dk-leftnav dk-leftnav-label.add-label');
  qlabels = 'dk-leftnav dk-leftnav-label.user-label';
  labels = $$(this.qlabels);
  labelActive = $('dk-leftnav dk-leftnav-label.active');
  extras = $$('dk-leftnav dk-leftnav-label.extra-label');
  labelsHeader = $('dk-leftnav mat-expansion-panel.user-labels mat-expansion-panel-header');
  qLabelsBody = 'dk-leftnav mat-expansion-panel.user-labels .mat-expansion-panel-content';
  extrasHeader = $('dk-leftnav mat-expansion-panel.extra-labels mat-expansion-panel-header');
  qExtrasBody = 'dk-leftnav mat-expansion-panel.extra-labels .mat-expansion-panel-content';
  addedLabel = $$(this.qlabels).get(2); // label one, label two, Label Two2 label zthree, should order case insensitive
  createLabelText;

  deleteLabelWithContacts(label, mode) {
    this.clickDeleteWithContacts(label); // delete label two, which has brenda/jane
    if (mode === 'keep') {
      poLabelDelete.radioKeep.click();
    } else {
      poLabelDelete.radioToss.click();
    }
    poLabelDelete.submit.click();
    poLabelDelete.waitForDown();
  }

  getLabelText(el) {
    return el.$('.name').getText();
  }

  editLabel(el, text) {
    this.clickEdit(el);
    poLabelEdit.input.clear();
    poLabelEdit.input.sendKeys(text);
    poLabelEdit.submit.click();
    browser.wait(EC.stalenessOf(poLabelEdit.dialog));
  }

  createLabel(text) {
    this.createLabelText = text;
    this.labelAdd.click();
    poLabelEdit.waitForUp();
    poLabelEdit.input.sendKeys('Label Two2');
    poLabelEdit.submit.click();
    poLabelEdit.waitForDown();
    this.addedLabel = this.labels.get(2);
  }

  clickEdit(el) {
    browser.actions().mouseMove(el).perform();
    el.$('.icon-edit').click();
    browser.wait(EC.presenceOf($('dk-edit-label')));
  }

  clickDeleteNoContacts(el) {
    browser.actions().mouseMove(el).perform();
    el.$('.icon-delete').click();
  }

  clickDeleteWithContacts(el) {
    this.clickDeleteNoContacts(el);
    poLabelDelete.waitForUp();
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
