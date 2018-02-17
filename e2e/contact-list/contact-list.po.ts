import {$, $$, browser, by, element, ElementFinder, protractor} from 'protractor';
import {CommonPO} from '../common.po';
import {ContactEditPO} from '../dialogs/po/contact-edit.po';
import {ContactListItemPO} from './contact-list-item.po';
import {ContactDeletePO} from '../dialogs/po/contact-delete.po';
import {ContactMoreActionsPO} from '../dialogs/po/contact-more-actions.po';
import {ContactEditClosePO} from '../dialogs/po/contact-edit-close.po';

const poContactEdit = new ContactEditPO();
const poContactDelete = new ContactDeletePO();
const poContactMoreActions = new ContactMoreActionsPO();
const poContactEditClose = new ContactEditClosePO();

export class ContactListPO extends CommonPO {
  contacts = $$('dk-contact-list dk-contact-list-item');
  names = $$('dk-contact-list dk-contact-list-item .name');
  addButton = $('dk-contact-list .add-button');
  divNoContacts = $('div.no-contacts');

  getNames() {
    return this.names.map(ef => ef.getText());
  }

  editContactName(listItem, name) {
    const poContactListItem = new ContactListItemPO(listItem);
    poContactListItem.clickEdit();
    poContactEdit.waitForUp();
    poContactEdit.name.clear();
    poContactEdit.name.sendKeys(name);
    poContactEdit.submit.click();
    poContactEdit.waitForDown();
  }

  addContact(name) {
    this.addButton.click();
    poContactEdit.name.sendKeys(name);
    poContactEdit.submit.click();
    poContactEdit.waitForDown();
  }

  addContactCancel(name) {
    this.addButton.click();
    poContactEdit.cancel.click();
  }

  addContactEntryCancelCloseSubmit(name) {
    this.addButton.click();
    poContactEdit.name.sendKeys(name);
    poContactEdit.cancel.click();
    poContactEditClose.waitForUp();
    poContactEditClose.submit.click();
    poContactEditClose.waitForDown();
  }

  addContactEntryCancelCloseCancel(name) {
    this.addButton.click();
    poContactEdit.name.sendKeys(name);
    poContactEdit.cancel.click();
    poContactEditClose.waitForUp();
    poContactEditClose.cancel.click();
    poContactEditClose.waitForDown();
    poContactEdit.submit.click();
    poContactEdit.waitForDown();
  }

  editContact(listItem) {
    const poContactListItem = new ContactListItemPO(listItem);
    poContactListItem.clickEdit();
  }

  deleteContact(listItem) {
    const poContactListItem = new ContactListItemPO(listItem);
    poContactListItem.clickMoreActions();
    poContactMoreActions.itemDelete.click();
    poContactDelete.waitForUp();
    poContactDelete.submit.click();
    poContactDelete.waitForDown();
  }

}
