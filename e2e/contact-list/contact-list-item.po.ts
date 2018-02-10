import {$, $$, browser, by, element, ElementFinder, protractor} from 'protractor';
import {CommonPO} from '../common.po';
import {ContactEditPO} from '../dialogs/po/contact-edit.po';
import {ContactMoreActionsPO} from '../dialogs/contact-more-actions.po';
import {ContactDetailPO} from '../dialogs/po/contact-detail.po';

const poContactDetail = new ContactDetailPO();
const poContactEdit = new ContactEditPO();
const poContactMoreActions = new ContactMoreActionsPO();

export class ContactListItemPO extends CommonPO {
  listItem; pic; name; email; phone; notes;

  constructor(listItem) {
    super();
    this.listItem = listItem;
    this.pic = listItem.$('.pic');
    this.name = listItem.$('.name');
    this.email = listItem.$('.email');
    this.phone = listItem.$('.phone');
    this.notes = listItem.$('.notes');
  }

  clickDetail() {
    this.pic.click();
    poContactDetail.waitForUp();
  }

  clickEdit() {
    browser.actions().mouseMove(this.listItem).perform();
    this.listItem.$('.icon-edit').click();
    poContactEdit.waitForUp();
  }

  clickMoreActions() {
    browser.actions().mouseMove(this.listItem).perform();
    this.listItem.$('.icon-more-actions').click();
    poContactMoreActions.waitForUp();
  }

}
