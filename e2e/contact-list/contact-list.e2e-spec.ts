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
    poContactListItem.pic.click();
    poContactDetail.waitForUp();
    expect(poContactDetail.dialog.isPresent()).toBe(true);
  });

  it('should edit name', () => {
    expect(po.getNames()).toEqual(['Brenda', 'jane - jane co', 'Martha Co']);
    po.editContactName(po.contacts.get(1), 'Jane Two');
    expect(po.getNames()).toEqual(['Brenda', 'Jane Two - jane co', 'Martha Co']);
    po.editContactName(po.contacts.get(1), 'jane');
    expect(po.getNames()).toEqual(['Brenda', 'jane - jane co', 'Martha Co']);
  });

  fit('should bring up email and phone windows when clicked on', async () => {
    const poContactListItem = new ContactListItemPO(po.contacts.get(0));
    let handles = await browser.getAllWindowHandles();
    expect(handles.length).toBe(1);
    poContactListItem.email.click();
    browser.wait(async () => (await browser.getAllWindowHandles()).length === 2);
    handles = await browser.getAllWindowHandles();
    expect(handles.length).toBe(2);
    browser.switchTo().window(handles[0]);
    poContactListItem.phone.click();
    handles = await browser.getAllWindowHandles();
    browser.wait(async () => (await browser.getAllWindowHandles()).length === 3);
    expect(handles.length).toBe(3);
    browser.switchTo().window(handles[0]);
  });

});

