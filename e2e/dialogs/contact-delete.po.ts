import {$, browser, element, by, ElementFinder, protractor, $$} from 'protractor';
import {CommonPO} from '../common.po';

const EC = protractor.ExpectedConditions;

export class ContactDeletePO extends CommonPO {
  dialog = $('dk-contact-delete');
  submit = $('dk-contact-delete .button-submit');
  cancel = $('dk-contact-delete .button-cancel');

  waitForUp() {
    browser.wait(EC.presenceOf(this.dialog));
  }

  waitForDown() {
    browser.wait(EC.stalenessOf(this.dialog));
  }

}

