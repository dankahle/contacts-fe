import {$, $$, browser, ElementFinder, protractor} from 'protractor';
import {LabelEditPO} from '../dialogs/po/label-edit.po';
import {ContactListPO} from '../contact-list/contact-list.po';
import {LabelDeletePO} from '../dialogs/po/label-delete.po';
import {LabelPO} from '../leftnav/label.po';
import {ContactEditPO} from '../dialogs/po/contact-edit.po';
import {ContactDetailPO} from '../dialogs/po/contact-detail.po';
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

  it('should NOT add Karla (no entry cancel)', () => {
    expect(po.getNames()).toEqual(['Brenda', 'jane - jane co', 'Martha Co']);
    po.addContactCancel('Karla');
    expect(po.getNames()).toEqual(['Brenda', 'jane - jane co', 'Martha Co']);
  });

  it('should NOT add Karla (entry cancel >> close submit)', () => {
    expect(po.getNames()).toEqual(['Brenda', 'jane - jane co', 'Martha Co']);
    po.addContactEntryCancelCloseSubmit('Karla');
    expect(po.getNames()).toEqual(['Brenda', 'jane - jane co', 'Martha Co']);
  });

  // delete test depends on this
  it('should add Karla, cancel, cancel close dialog, then submit', () => {
    expect(po.getNames()).toEqual(['Brenda', 'jane - jane co', 'Martha Co']);
    po.addContactEntryCancelCloseCancel('Karla');
    expect(po.getNames()).toEqual(['Brenda', 'jane - jane co', 'Karla', 'Martha Co']);
    browser.refresh();
    expect(po.getNames()).toEqual(['Brenda', 'jane - jane co', 'Karla', 'Martha Co']);
  });

  // this test depends on "add" test
  it('should delete Karla', () => {
    expect(po.getNames()).toEqual(['Brenda', 'jane - jane co', 'Karla', 'Martha Co']);
    po.deleteContact(po.contacts.get(2));
    expect(po.getNames()).toEqual(['Brenda', 'jane - jane co', 'Martha Co']);
  });

  it('should add then delete Karla', () => {
    expect(po.getNames()).toEqual(['Brenda', 'jane - jane co', 'Martha Co']);
    po.addContact('Karla');
    expect(po.getNames()).toEqual(['Brenda', 'jane - jane co', 'Karla', 'Martha Co']);
    po.deleteContact(po.contacts.get(2));
    expect(po.getNames()).toEqual(['Brenda', 'jane - jane co', 'Martha Co']);
  });

  it('should bring up detail dialog when clicked on', () => {
    const poContactListItem = new ContactListItemPO(po.contacts.get(0));
    poContactListItem.clickDetail();
    expect(poContactDetail.dialog.isPresent()).toBe(true);
    poContactDetail.takeDownClose();
  });

  it('should edit name', () => {
    expect(po.getNames()).toEqual(['Brenda', 'jane - jane co', 'Martha Co']);
    po.editContactName(po.contacts.get(1), 'Jane Two');
    expect(po.getNames()).toEqual(['Brenda', 'Jane Two - jane co', 'Martha Co']);
    browser.refresh();
    expect(po.getNames()).toEqual(['Brenda', 'Jane Two - jane co', 'Martha Co']);
    po.editContactName(po.contacts.get(1), 'jane');
    expect(po.getNames()).toEqual(['Brenda', 'jane - jane co', 'Martha Co']);
  });

  it('should bring up email and phone windows when clicked on', async () => {
    const poContactListItem = new ContactListItemPO(po.contacts.get(0));
    const handles = await browser.getAllWindowHandles();
    const count = handles.length;
    poContactListItem.email.click();
    browser.wait(async () => (await browser.getAllWindowHandles()).length === count + 1);
    browser.switchTo().window(handles[0]);
    poContactListItem.phone.click();
    browser.wait(async () => (await browser.getAllWindowHandles()).length === count + 2);
    browser.switchTo().window(handles[0]);
  });

  it('should show correct columns per breakpoint', () => {
    const poContactListItem = new ContactListItemPO(po.contacts.get(2));
    po.resizeWindow(1980);
    expect(poContactListItem.name.isDisplayed()).toBe(true);
    expect(poContactListItem.email.isDisplayed()).toBe(true);
    expect(poContactListItem.phone.isDisplayed()).toBe(true);
    expect(poContactListItem.notes.isDisplayed()).toBe(true);
    po.resizeWindow(1299);
    expect(poContactListItem.name.isDisplayed()).toBe(true);
    expect(poContactListItem.email.isDisplayed()).toBe(true);
    expect(poContactListItem.phone.isDisplayed()).toBe(true);
    expect(poContactListItem.notes.isDisplayed()).toBe(false);
    po.resizeWindow(1099);
    expect(poContactListItem.name.isDisplayed()).toBe(true);
    expect(poContactListItem.email.isDisplayed()).toBe(true);
    expect(poContactListItem.phone.isDisplayed()).toBe(false);
    expect(poContactListItem.notes.isDisplayed()).toBe(false);
    po.resizeWindow(899);
    expect(poContactListItem.name.isDisplayed()).toBe(true);
    expect(poContactListItem.email.isDisplayed()).toBe(false);
    expect(poContactListItem.phone.isDisplayed()).toBe(false);
    expect(poContactListItem.notes.isDisplayed()).toBe(false);
    browser.refresh();
    expect(poContactListItem.name.isDisplayed()).toBe(true);
    expect(poContactListItem.email.isDisplayed()).toBe(false);
    expect(poContactListItem.phone.isDisplayed()).toBe(false);
    expect(poContactListItem.notes.isDisplayed()).toBe(false);
    po.resizeWindow(1980);
  });

});

