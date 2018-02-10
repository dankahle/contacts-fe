import {$, browser, element, by, ElementFinder, protractor, $$} from 'protractor';
import {CommonPO} from '../../common.po';

const EC = protractor.ExpectedConditions;

export class ContactEditPO extends CommonPO {
  dialog = $('dk-contact-edit');
  name = $('dk-contact-edit .po-name');
  submit = $('dk-contact-edit .button-submit');
  cancel = $('dk-contact-edit .button-cancel');

  waitForUp() {
    browser.wait(EC.presenceOf(this.dialog));
  }

  waitForDown() {
    browser.wait(EC.stalenessOf(this.dialog));
  }

}

