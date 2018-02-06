import {$, $$, browser, by, element, ElementFinder, protractor} from 'protractor';
import {CommonPO} from '../common.po';
import {ContactEditPO} from '../dialogs/contact-edit.po';
import {ContactMoreActionsPO} from '../dialogs/contact-more-actions.po';

const poContactEdit = new ContactEditPO();
const poContactMoreActions = new ContactMoreActionsPO();

export class ContactListItemPO extends CommonPO {
  listItem;
  pic;

  constructor(listItem) {
    super();
    this.listItem = listItem;
    this.pic = listItem.$('.pic');
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
