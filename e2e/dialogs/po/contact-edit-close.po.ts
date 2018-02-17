import {$, browser, element, by, ElementFinder, protractor, $$} from 'protractor';
import {CommonPO} from '../../common.po';

const EC = protractor.ExpectedConditions;

export class ContactEditClosePO extends CommonPO {
  dialog = $('dk-contact-edit-close');
  submit = $('dk-contact-edit-close .button-submit');
  cancel = $('dk-contact-edit-close .button-cancel');

  takeDownBody() {
    browser.actions().mouseMove(this.submit, {x: 200, y: 0}).click().perform();
    this.waitForDown();
  }

  takeDownCancel() {
    this.cancel.click();
    this.waitForDown();
  }

  takeDownSubmit() {
    this.submit.click();
    this.waitForDown();
  }

  waitForUp() {
    browser.wait(EC.presenceOf(this.dialog));
  }

  waitForDown() {
    browser.wait(EC.stalenessOf(this.dialog));
  }

}

