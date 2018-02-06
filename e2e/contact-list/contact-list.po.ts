import {$, $$, browser, by, element, ElementFinder, protractor} from 'protractor';
import {CommonPO} from '../common.po';
import {ContactEditPO} from '../dialogs/contact-edit.po';
import {ContactListItemPO} from './contact-list-item.po';
import {ContactDeletePO} from '../dialogs/contact-delete.po';
import {ContactMoreActionsPO} from '../dialogs/contact-more-actions.po';

const poContactEdit = new ContactEditPO();
const poContactDelete = new ContactDeletePO();
const poContactMoreActions = new ContactMoreActionsPO();

export class ContactListPO extends CommonPO {
  contacts = $$('dk-contact-list dk-contact-list-item');
  names = $$('dk-contact-list dk-contact-list-item .name');
  addButton = $('dk-contact-list .add-button');
  divNoContacts = $('div.no-contacts');

  getNames() {
    return this.names.map(ef => ef.getText());
  }

  addContact(name) {
    this.addButton.click();
    poContactEdit.name.sendKeys(name);
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
