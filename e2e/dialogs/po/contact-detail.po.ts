import {$, browser, element, by, ElementFinder, protractor, $$} from 'protractor';
import {CommonPO} from '../../common.po';

const EC = protractor.ExpectedConditions;

export class ContactDetailPO extends CommonPO {
  dialog = $('dk-contact-detail');
  name = $('dk-contact-detail .name');
  edit = $('dk-contact-detail .edit');
  moreActions = $('dk-contact-detail .more-actions');
  close = $('dk-contact-detail .close');
  labels = $$('dk-contact-detail .labels .label');

  takeDownClose() {
    this.close.click();
    this.waitForDown();
  }

  waitForUp() {
    browser.wait(EC.presenceOf(this.dialog));
  }

  waitForDown() {
    browser.wait(EC.stalenessOf(this.dialog));
  }

}

