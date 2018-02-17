import {$, browser, element, by, ElementFinder, protractor, $$} from 'protractor';
import {CommonPO} from '../../common.po';
import {ContactEditPO} from './contact-edit.po';

const EC = protractor.ExpectedConditions;
const poContactEdit = new ContactEditPO();

export class ContactDetailPO extends CommonPO {
  dialog = $('dk-contact-detail');
  title = $('dk-contact-detail .name');
  edit = $('dk-contact-detail .edit');
  moreActions = $('dk-contact-detail .more-actions');
  close = $('dk-contact-detail .close');
  labelTags = $$('dk-contact-detail .labels .label');
  company = $('dk-contact-detail .section.company .value-div');
  emails = $$('dk-contact-detail .section.emails .value-div .value');
  phones = $$('dk-contact-detail .section.phones .value-div .value');
  addresses = $$('dk-contact-detail .section.addresses .value-div .value');
  websites = $$('dk-contact-detail .section.websites .value-div .value');
  notes = $('dk-contact-detail .section.notes .value-text');

  emailsA = $$('dk-contact-detail .section.emails .value-div a');
  phonesA = $$('dk-contact-detail .section.phones .value-div a');
  addressesA = $$('dk-contact-detail .section.addresses .value-div a');
  websitesA = $$('dk-contact-detail .section.websites .value-div a');

  labels = $$('dk-contact-detail .labels .label');
  contacts = $$('dk-contact-list-item')
  addButton = $('dk-contact-list .add-button');

  addContact(name) {
    this.addButton.click();
    poContactEdit.name.sendKeys(name);
    poContactEdit.submit.click();
    poContactEdit.waitForDown();
  }

  putUpDialog(idx) {
    this.contacts.get(idx).$('.pic').click();
    this.waitForUp();
  }

  takeDownClose() {
    this.close.click();
    this.waitForDown();
  }

  takeDownBody() {
    browser.actions().mouseMove(this.close, {x: 200, y: 0}).click().perform();
    this.waitForDown();
  }

  waitForUp() {
    browser.wait(EC.presenceOf(this.dialog));
  }

  waitForDown() {
    browser.wait(EC.stalenessOf(this.dialog));
  }

}

