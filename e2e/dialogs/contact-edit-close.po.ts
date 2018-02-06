import {$, browser, element, by, ElementFinder, protractor, $$} from 'protractor';
import {CommonPO} from '../common.po';

const EC = protractor.ExpectedConditions;

export class ContactEditClosePO extends CommonPO {
  dialog = $('dk-contact-edit-close');
  submit = $('dk-contact-edit-close .button-submit');
  cancel = $('dk-contact-edit-close .button-cancel');

  waitForUp() {
    browser.wait(EC.presenceOf(this.dialog));
  }

  waitForDown() {
    browser.wait(EC.stalenessOf(this.dialog));
  }

}

