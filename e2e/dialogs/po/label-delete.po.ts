import {$, browser, element, by, ElementFinder, protractor, $$} from 'protractor';
import {CommonPO} from '../../common.po';

const EC = protractor.ExpectedConditions;

export class LabelDeletePO extends CommonPO {
  dialog = $('dk-delete-label');
  submit = $('dk-delete-label button.submit');
  cancel = $('dk-delete-label button.cancel');
  radioKeep = $('dk-delete-label mat-radio-button.keep');
  radioToss = $('dk-delete-label mat-radio-button.toss');
  qlabels = 'dk-leftnav dk-leftnav-label.user-label';
  labels = $$(this.qlabels);

  putUpDeleteDialog() {
    browser.actions().mouseMove(this.labels.get(1)).perform();
    this.labels.get(1).$('.icon-delete').click(); // delete label two
    this.waitForUp();
  }

  takeDown() {
    browser.actions().mouseMove($('dk-delete-label button.submit'), {x: 0, y: 100}).perform();
    browser.actions().click().perform();
    this.waitForDown();
  }

  waitForUp() {
    browser.wait(EC.presenceOf(this.dialog));
  }

  waitForDown() {
    browser.wait(EC.stalenessOf(this.dialog));
  }

}

