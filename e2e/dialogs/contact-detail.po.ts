import {$, browser, element, by, ElementFinder, protractor, $$} from 'protractor';
import {CommonPO} from '../common.po';

const EC = protractor.ExpectedConditions;

export class ContactDetailPO extends CommonPO {
  dialog = $('dk-contact-detail');
  name = $('dk-contact-detail .name');
  close = $('dk-contact-detail .close');

  waitForUp() {
    browser.wait(EC.presenceOf(this.dialog));
  }

  waitForDown() {
    browser.wait(EC.stalenessOf(this.dialog));
  }

}

