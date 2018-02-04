import {$, $$, browser, by, element, ElementFinder, protractor} from 'protractor';
import {CommonPO} from '../common.po';
import {ContactEditPO} from '../dialogs/contact-edit.po';

export class ContactListPO extends CommonPO {
  contacts = $$('dk-contact-list dk-contact-list-item');
  names = $$('dk-contact-list dk-contact-list-item .name');
  addButton = $('dk-contact-list .add-button');
  poContactEdit = new ContactEditPO();

  getNames() {
    return this.names.map(ef => ef.getText());
  }

  clickEdit(el) {
    browser.actions().mouseMove(el).perform();
    el.$('.??').click();
  }

  addContacts(arrNames) {
    arrNames.forEach(name => {
      this.addButton.click();
      this.poContactEdit.name.sendKeys(name);
      this.poContactEdit.submit.click();
    });
  }

}
