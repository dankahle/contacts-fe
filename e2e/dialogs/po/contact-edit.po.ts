import {$, browser, element, by, ElementFinder, protractor, $$} from 'protractor';
import {CommonPO} from '../../common.po';

const EC = protractor.ExpectedConditions;

export class ContactEditPO extends CommonPO {
  dialog = $('dk-contact-edit');
  name = $('dk-contact-edit .po-name');
  submit = $('dk-contact-edit .button-submit');
  cancel = $('dk-contact-edit .button-cancel');
  contacts = $$('dk-contact-list-item');

  putUpDialog(idx) {
    const contactItem = this.contacts.get(idx);
    browser.actions().mouseMove(contactItem).perform();
    contactItem.$('.icon-edit').click();
    this.waitForUp();
  }

  takeDownCancel() {
    this.cancel.click();
    this.waitForDown();
  }

  takeDownSubmit() {
    this.submit.click();
    this.waitForDown();
  }

  bodyClick() {
    browser.actions().mouseMove(this.submit, {x: 200, y: 0}).click().perform();
  }
  takeDownBody() {
    this.bodyClick();
    this.waitForDown();
  }

  waitForUp() {
    browser.wait(EC.presenceOf(this.dialog));
  }

  waitForDown() {
    browser.wait(EC.stalenessOf(this.dialog));
  }

}

