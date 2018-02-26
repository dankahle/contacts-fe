import {$, browser, element, by, ElementFinder, protractor, $$} from 'protractor';
import {CommonPO} from '../../common.po';
import {ContactEditClosePO} from './contact-edit-close.po';

const EC = protractor.ExpectedConditions;
const poContactEditClose = new ContactEditClosePO();

export class ContactEditPO extends CommonPO {
  dialog = $('dk-contact-edit');
  submit = $('dk-contact-edit .button-submit');
  cancel = $('dk-contact-edit .button-cancel');
  contacts = $$('dk-contact-list-item');
  addButton = $('dk-contact-list .add-button');

  name = $('dk-contact-edit input.po-name');
  nameError = $('dk-contact-edit .name-error');
  company = $('dk-contact-edit input.company');
  jobTitle = $('dk-contact-edit input.job-title');
  emails = $$('dk-contact-edit input.email');
  emailErrors = $$('dk-contact-edit mat-error.email-error');
  emailLabels = $$('dk-contact-edit input.email-label');
  phonePrefixes = $$('dk-contact-edit mat-select.prefix');
  phones = $$('dk-contact-edit input.phone');
  phoneLabels = $$('dk-contact-edit input.phone-label');
  addrs = $$('dk-contact-edit textarea.addr');
  addrLabels = $$('dk-contact-edit input.addr-label');
  websites = $$('dk-contact-edit input.site');
  websiteLabels = $$('dk-contact-edit input.site-label');
  notes = $('dk-contact-edit textarea.notes');
  sectionEmails = $$('dk-contact-edit .section.email');
  sectionPhones = $$('dk-contact-edit .section.phone');
  sectionAddrs = $$('dk-contact-edit .section.addr');
  sectionWebsites = $$('dk-contact-edit .section.website');

  cancelAndDeleteSubmit() {
    this.cancel.click();
    poContactEditClose.waitForUp();
    poContactEditClose.takeDownSubmit();
    this.waitForDown();
  }

  clickSectionAdd(type, idx) {
    $$(`dk-contact-edit .section.${type}`).get(idx).$('.add').click();
  }

  clickSectionClear(type, idx) {
    $$(`dk-contact-edit .section.${type}`).get(idx).$('.clear').click();
  }

  putUpDetail(idx) {
    this.contacts.get(idx).$('.pic').click();
    browser.wait(EC.presenceOf($('dk-contact-detail')));
  }

  putUpDialogAdd() {
    this.addButton.click();
    this.waitForUp();
  }

  putUpDialogEdit(idx) {
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

