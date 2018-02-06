import {$, $$, browser, ElementFinder, protractor} from 'protractor';
import {LabelEditPO} from '../dialogs/label-edit.po';
import {ContactListPO} from '../contact-list/contact-list.po';
import {LabelDeletePO} from '../dialogs/label-delete.po';
import {LabelPO} from '../leftnav/labels.po';
import {ContactEditPO} from '../dialogs/contact-edit.po';
import {ContactDetailPO} from '../dialogs/contact-detail.po';
import {ContactListItemPO} from './contact-list-item.po';

const EC = protractor.ExpectedConditions;
const po = new ContactListPO();
const poLabel = new LabelPO();
const poContactDetail = new ContactDetailPO();

describe('##### contact list tests', () => {

  beforeAll(() => {
    po.refreshDbAndSetPage('/');
  });

  it('should show no contacts view when label zthree is selected', () => {
    poLabel.labels.get(2).click();
    expect(po.divNoContacts.isPresent()).toBe(true);
    poLabel.labelContacts.click();
  });

  // delete test depends on this
  it('should add Karla', () => {
    expect(po.getNames()).toEqual(['Brenda', 'jane - jane co', 'Martha Co']);
    po.addContact('Karla');
    expect(po.getNames()).toEqual(['Brenda', 'jane - jane co', 'Karla', 'Martha Co']);
  });

  // this test depends on "add" test
  it('should delete Karla', () => {
    expect(po.getNames()).toEqual(['Brenda', 'jane - jane co', 'Karla', 'Martha Co']);
    po.deleteContact(po.contacts.get(2));
    expect(po.getNames()).toEqual(['Brenda', 'jane - jane co', 'Martha Co']);
  });

  fit('should bring up detail dialog when clicked on', () => {
    const poContactListItem = new ContactListItemPO(po.contacts.get(0));
    poContactListItem.pic.click();
    poContactDetail.waitForUp();
    expect(poContactDetail.dialog.isPresent()).toBe(true);
  });

});

