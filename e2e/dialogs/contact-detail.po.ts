import {$, browser, element, by, ElementFinder, protractor, $$} from 'protractor';
import {CommonPO} from '../common.po';

const EC = protractor.ExpectedConditions;

export class ContactDetailPO extends CommonPO {
  dialog = $('dk-contact-detail');
  name = $('dk-contact-detail .po-name');
  submit = $('dk-contact-detail .button-submit');
  cancel = $('dk-contact-detail .button-cancel');

  waitForUp() {
    browser.wait(EC.presenceOf(this.dialog));
  }

  waitForDown() {
    browser.wait(EC.stalenessOf(this.dialog));
  }

}

