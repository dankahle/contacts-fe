import {$, $$, browser, ElementFinder, protractor} from 'protractor';
import {ContactDetailPO} from './po/contact-detail.po';
import {ContactEditPO} from './po/contact-edit.po';
import {ContactListItemPO} from '../contact-list/contact-list-item.po';

const EC = protractor.ExpectedConditions;
const po = new ContactDetailPO();
const poContactEdit = new ContactEditPO();

describe('##### contact detail tests', () => {

  beforeAll(() => {
    po.refreshDbAndSetPage('/');
  });

  beforeEach(() => {
  });

  it('should close by close button', () => {
    po.putUpDialog(1);
    expect(po.dialog.isPresent()).toBe(true);
    po.takeDownClose();
    expect(po.dialog.isPresent()).toBe(false);
  })

  it('should go down by body click', () => {
    po.putUpDialog(1);
    expect(po.dialog.isPresent()).toBe(true);
    po.takeDownBody();
    expect(po.dialog.isPresent()).toBe(false);
  });

  it('should show name and/or company for title', () => {
    po.putUpDialog(0);
    expect(po.title.getText()).toBe('Brenda')
    po.takeDownClose();
    po.putUpDialog(1);
    expect(po.title.getText()).toBe('jane - jane co')
    po.takeDownClose();
    po.putUpDialog(2);
    expect(po.title.getText()).toBe('Martha Co')
    po.takeDownClose();

  });


  it('should show "jobTitle, company" or "company"', () => {
    po.putUpDialog(1);
    expect(po.company.getText()).toBe('Manager, jane co');
    po.takeDownClose();
    po.putUpDialog(2);
    expect(po.company.getText()).toBe('Martha Co');
    po.takeDownClose();
  });

  it('should show nothing if jobTitle, but no company', () => {
    po.putUpDialog(0);
    expect(po.company.isPresent()).toBe(false);
    po.takeDownClose();
  });

  it('should show all fields on entry (with/without label)', () => {
    po.putUpDialog(2);
    expect(po.emails.get(0).getText()).toBe('martha1@gmail.com');
    expect(po.emails.get(1).getText()).toBe('martha2@gmail.com  •  Home');
    expect(po.phones.get(0).getText()).toBe('111-222-3333');
    expect(po.phones.get(1).getText()).toBe('55-112-222-3333  •  Mobile');
    expect(po.addresses.get(0).getText()).toMatch('952 NE Lovell St. Hillsboro, OR 97124');
    expect(po.addresses.get(1).getText()).toMatch('10260 SW Greenburg Rd #600, Tigard, OR 97223  •  Work');
    expect(po.websites.get(0).getText()).toMatch('https://www.google.com');
    expect(po.websites.get(1).getText()).toMatch('www.weather.com  •  weather');
    // expect(po.notes.getText()).toBe('notes first line\nnotes second line\nnotes third line');
    expect(po.notes.getAttribute('innerHTML')).toBe('notes first line<br>notes second line<br>notes third line');
    po.takeDownClose();
  });

  // next test is dependent on this added contact
  it('should show only title if nothing else entered', () => {
    po.addContact('zzz');
    po.putUpDialog(3);
    expect(po.contacts.count()).toBe(4);
    expect(po.title.getText()).toBe('zzz');
    expect($('dk-contact-detail .section.company').isPresent()).toBe(false);
    expect($('dk-contact-detail .section.emails').isPresent()).toBe(false);
    expect($('dk-contact-detail .section.phones').isPresent()).toBe(false);
    expect($('dk-contact-detail .section.addresses').isPresent()).toBe(false);
    expect($('dk-contact-detail .section.websites').isPresent()).toBe(false);
    expect($('dk-contact-detail .section.notes').isPresent()).toBe(false);
    po.takeDownClose();
  });

  // this is dependent on previous test's added contact
  it('should show correct label tags', () => {
    po.putUpDialog(0);
    expect(po.labelTags.getText()).toEqual(['label two']);
    po.takeDownClose();
    po.putUpDialog(1);
    expect(po.labelTags.getText()).toEqual(['label one', 'label two']);
    po.takeDownClose();
    po.putUpDialog(2);
    expect(po.labelTags.getText()).toEqual(['label one']);
    po.takeDownClose();
    po.putUpDialog(3);
    expect(po.labelTags.count()).toBe(0);
    po.takeDownClose();
  });

  it('should open edit on edit click, and take down both on edit close', () => {
    po.putUpDialog(1);
    po.edit.click();
    poContactEdit.waitForUp();
    expect(poContactEdit.dialog.isPresent()).toBe(true);
    poContactEdit.takeDownCancel();
    po.waitForDown();
    expect(poContactEdit.dialog.isPresent()).toBe(false);
    expect(po.dialog.isPresent()).toBe(false);
  });

  it('should open new windows for email/phone/addr/website click', async () => {
    po.putUpDialog(1);
    let handles = await browser.getAllWindowHandles();
    const count = handles.length;
    po.emailsA.get(0).click();
    browser.wait(async () => (await browser.getAllWindowHandles()).length === count + 1);
    browser.switchTo().window(handles[0]);
    po.phonesA.get(0).click();
    handles = await browser.getAllWindowHandles();
    browser.wait(async () => (await browser.getAllWindowHandles()).length === count + 2);
    browser.switchTo().window(handles[0]);
    po.addressesA.get(1).click();
    handles = await browser.getAllWindowHandles();
    browser.wait(async () => (await browser.getAllWindowHandles()).length === count + 3);
    browser.switchTo().window(handles[0]);
    po.websitesA.get(1).click();
    handles = await browser.getAllWindowHandles();
    browser.wait(async () => (await browser.getAllWindowHandles()).length === count + 4);
    browser.switchTo().window(handles[0]);
    po.takeDownClose();
  });

});

