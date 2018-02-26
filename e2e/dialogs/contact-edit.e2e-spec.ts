import {$, $$, browser, ElementFinder, protractor} from 'protractor';
import {ContactEditPO} from './po/contact-edit.po';
import {ContactDeletePO} from './po/contact-delete.po';
import {ContactEditClosePO} from './po/contact-edit-close.po';
import {ContactDetailPO} from './po/contact-detail.po';

const EC = protractor.ExpectedConditions;
const po = new ContactEditPO();
const poContactDetail = new ContactDetailPO();
const poContactEditClose = new ContactEditClosePO();

describe('##### contact edit tests', () => {

  beforeAll(() => {
    po.refreshDbAndSetPage('/');
  });

  it('should go down by body click (nothing changed)', () => {
    po.putUpDialogAdd();
    expect(po.dialog.isPresent()).toBe(true);
    po.takeDownBody();
    expect(po.dialog.isPresent()).toBe(false);
  });

  it('should go down by cancel click (nothing changed)', () => {
    po.putUpDialogAdd();
    expect(po.dialog.isPresent()).toBe(true);
    po.takeDownCancel();
    expect(po.dialog.isPresent()).toBe(false);
  });

  it('should have all fields empty', () => {
    po.putUpDialogAdd();
    expect(po.name.getAttribute('value')).toBe('', 'name');
    expect(po.company.getAttribute('value')).toBe('', 'company');
    expect(po.jobTitle.getAttribute('value')).toBe('', 'jobTitle');
    (<any>expect(po.emails.getAttribute('value'))).toBeAnyOfEqual([[], ['']], 'emails');
    (<any>expect(po.emailLabels.getAttribute('value'))).toBeAnyOfEqual([[], ['']], 'emailLabels');
    (<any>expect(po.phones.getAttribute('value'))).toBeAnyOfEqual([[], ['']], 'phones');
    (<any>expect(po.phoneLabels.getAttribute('value'))).toBeAnyOfEqual([[], ['']], 'phoneLabels');
    (<any>expect(po.addrs.getAttribute('value'))).toBeAnyOfEqual([[], ['']], 'addrs');
    (<any>expect(po.addrLabels.getAttribute('value'))).toBeAnyOfEqual([[], ['']], 'addrLabels');
    (<any>expect(po.websites.getAttribute('value'))).toBeAnyOfEqual([[], ['']], 'websites');
    (<any>expect(po.websiteLabels.getAttribute('value'))).toBeAnyOfEqual([[], ['']], 'websiteLabels');
    po.takeDownCancel();
  });

  it('should do nothing on cancel (no change)', () => {
    expect(po.contacts.count()).toBe(3);
    po.putUpDialogAdd();
    po.takeDownCancel();
    expect(po.dialog.isPresent()).toBe(false);
    expect(po.contacts.count()).toBe(3);
  });

  it('should bring up contact delete on cancel if data changed, and not add if close submit', () => {
    expect(po.contacts.count()).toBe(3);
    po.putUpDialogAdd();
    expect(po.dialog.isPresent()).toBe(true);
    po.name.sendKeys('x');
    po.cancel.click();
    poContactEditClose.waitForUp();
    expect(poContactEditClose.dialog.isPresent()).toBe(true);
    poContactEditClose.takeDownSubmit();
    expect(poContactEditClose.dialog.isPresent()).toBe(false);
    po.waitForDown();
    expect(po.dialog.isPresent()).toBe(false);
    expect(po.contacts.count()).toBe(3);
  });

  it('should bring up contact delete on body click if data changed, and not add if close submit', () => {
    expect(po.contacts.count()).toBe(3);
    po.putUpDialogAdd();
    expect(po.dialog.isPresent()).toBe(true);
    po.name.sendKeys('x');
    po.bodyClick();
    poContactEditClose.waitForUp();
    expect(poContactEditClose.dialog.isPresent()).toBe(true);
    poContactEditClose.takeDownSubmit();
    expect(poContactEditClose.dialog.isPresent()).toBe(false);
    po.waitForDown();
    expect(po.dialog.isPresent()).toBe(false);
    expect(po.contacts.count()).toBe(3);
  });

  it('should show error if no name or company (touched)', () => {
    po.putUpDialogAdd();
    expect(po.dialog.isPresent()).toBe(true);
    expect(po.nameError.isPresent()).toBe(false);
    po.name.click();
    po.company.click();
    po.jobTitle.click();
    expect(po.nameError.isPresent()).toBe(true);
    po.takeDownCancel()
    expect(po.dialog.isPresent()).toBe(false);
  });

  it('should show error if no name or company (submit)', () => {
    po.putUpDialogAdd();
    expect(po.dialog.isPresent()).toBe(true);
    expect(po.nameError.isPresent()).toBe(false);
    po.submit.click();
    expect(po.nameError.isPresent()).toBe(true);
    po.takeDownCancel()
    expect(po.dialog.isPresent()).toBe(false);
  });

  it('should show email error (touched)', () => {
    po.putUpDialogAdd();
    expect(po.emails.count()).toBe(1);
    expect(po.emailErrors.count()).toBe(0);
    po.emails.get(0).sendKeys('x');
    po.name.click();
    expect(po.emailErrors.count()).toBe(1);
    po.emails.get(0).sendKeys(protractor.Key.BACK_SPACE);
    po.emails.get(0).sendKeys('x@x.xx');
    po.emails.get(0).sendKeys(protractor.Key.BACK_SPACE);
    po.emails.get(0).sendKeys(protractor.Key.BACK_SPACE);
    po.emails.get(0).sendKeys(protractor.Key.BACK_SPACE);
    po.emails.get(0).sendKeys(protractor.Key.BACK_SPACE);
    po.emails.get(0).sendKeys(protractor.Key.BACK_SPACE);
    po.emails.get(0).sendKeys(protractor.Key.BACK_SPACE);
    expect(po.emailErrors.count()).toBe(0);
    po.takeDownCancel();
  });

  it('should add and delete sections, but clear if only one (email)', () => {
    po.putUpDialogAdd();
    expect(po.sectionEmails.count()).toBe(1);
    po.clickSectionAdd('email', 0);
    expect(po.sectionEmails.count()).toBe(2);
    po.clickSectionAdd('email', 1);
    expect(po.sectionEmails.count()).toBe(3);
    po.clickSectionAdd('email', 2);
    expect(po.sectionEmails.count()).toBe(4);
    po.emails.get(0).sendKeys('x');
    po.emailLabels.get(0).sendKeys('y');
    po.clickSectionClear('email', 3);
    expect(po.sectionEmails.count()).toBe(3);
    expect(po.emails.get(2).getAttribute('value')).toBe('');
    expect(po.emailLabels.get(2).getAttribute('value')).toBe('');
    po.clickSectionClear('email', 0);
    po.clickSectionClear('email', 0);
    po.clickSectionClear('email', 0);
    po.clickSectionClear('email', 0);
    expect(po.sectionEmails.count()).toBe(1);
    po.emails.get(0).sendKeys('x');
    po.emailLabels.get(0).sendKeys('y');
    po.clickSectionClear('email', 0);
    expect(po.sectionEmails.count()).toBe(1);
    expect(po.emails.get(0).getAttribute('value')).toBe('');
    expect(po.emailLabels.get(0).getAttribute('value')).toBe('');
    po.takeDownCancel();
  });

  it('should add and delete sections, but clear if only one (phone)', () => {
    po.putUpDialogAdd();
    expect(po.sectionPhones.count()).toBe(1);
    po.clickSectionAdd('phone', 0);
    expect(po.sectionPhones.count()).toBe(2);
    po.clickSectionAdd('phone', 1);
    expect(po.sectionPhones.count()).toBe(3);
    po.clickSectionAdd('phone', 2);
    expect(po.sectionPhones.count()).toBe(4);
    po.phones.get(0).sendKeys('x');
    po.phoneLabels.get(0).sendKeys('y');
    po.clickSectionClear('phone', 3);
    expect(po.sectionPhones.count()).toBe(3);
    expect(po.phones.get(2).getAttribute('value')).toBe('');
    expect(po.phoneLabels.get(2).getAttribute('value')).toBe('');
    po.clickSectionClear('phone', 0);
    po.clickSectionClear('phone', 0);
    po.clickSectionClear('phone', 0);
    po.clickSectionClear('phone', 0);
    expect(po.sectionPhones.count()).toBe(1);
    po.phones.get(0).sendKeys('x');
    po.phoneLabels.get(0).sendKeys('y');
    po.clickSectionClear('phone', 0);
    expect(po.sectionPhones.count()).toBe(1);
    expect(po.phones.get(0).getAttribute('value')).toBe('');
    expect(po.phoneLabels.get(0).getAttribute('value')).toBe('');
    po.takeDownCancel();
  });

  it('should add and delete sections, but clear if only one (addr)', () => {
    po.putUpDialogAdd();
    expect(po.sectionAddrs.count()).toBe(1);
    po.clickSectionAdd('addr', 0);
    expect(po.sectionAddrs.count()).toBe(2);
    po.clickSectionAdd('addr', 1);
    expect(po.sectionAddrs.count()).toBe(3);
    po.clickSectionAdd('addr', 2);
    expect(po.sectionAddrs.count()).toBe(4);
    po.addrs.get(0).sendKeys('x');
    po.addrLabels.get(0).sendKeys('y');
    po.clickSectionClear('addr', 3);
    expect(po.sectionAddrs.count()).toBe(3);
    expect(po.addrs.get(2).getAttribute('value')).toBe('');
    expect(po.addrLabels.get(2).getAttribute('value')).toBe('');
    po.clickSectionClear('addr', 0);
    po.clickSectionClear('addr', 0);
    po.clickSectionClear('addr', 0);
    po.clickSectionClear('addr', 0);
    expect(po.sectionAddrs.count()).toBe(1);
    po.addrs.get(0).sendKeys('x');
    po.addrLabels.get(0).sendKeys('y');
    po.clickSectionClear('addr', 0);
    expect(po.sectionAddrs.count()).toBe(1);
    expect(po.addrs.get(0).getAttribute('value')).toBe('');
    expect(po.addrLabels.get(0).getAttribute('value')).toBe('');
    po.takeDownCancel();
  });

  it('should add and delete sections, but clear if only one (website)', () => {
    po.putUpDialogAdd();
    expect(po.sectionWebsites.count()).toBe(1);
    po.clickSectionAdd('website', 0);
    expect(po.sectionWebsites.count()).toBe(2);
    po.clickSectionAdd('website', 1);
    expect(po.sectionWebsites.count()).toBe(3);
    po.clickSectionAdd('website', 2);
    expect(po.sectionWebsites.count()).toBe(4);
    po.websites.get(0).sendKeys('x');
    po.websiteLabels.get(0).sendKeys('y');
    po.clickSectionClear('website', 3);
    expect(po.sectionWebsites.count()).toBe(3);
    expect(po.websites.get(2).getAttribute('value')).toBe('');
    expect(po.websiteLabels.get(2).getAttribute('value')).toBe('');
    po.clickSectionClear('website', 0);
    po.clickSectionClear('website', 0);
    po.clickSectionClear('website', 0);
    po.clickSectionClear('website', 0);
    expect(po.sectionWebsites.count()).toBe(1);
    po.websites.get(0).sendKeys('x');
    po.websiteLabels.get(0).sendKeys('y');
    po.clickSectionClear('website', 0);
    expect(po.sectionWebsites.count()).toBe(1);
    expect(po.websites.get(0).getAttribute('value')).toBe('');
    expect(po.websiteLabels.get(0).getAttribute('value')).toBe('');
    po.takeDownCancel();
  });

  it('should remove empty emails/phones/addrs/website', () => {
    po.putUpDialogAdd();
    po.name.sendKeys('matha2');
    expect(po.sectionEmails.count()).toBe(1);
    po.emails.get(0).sendKeys('x@x.xx');
    po.clickSectionAdd('email', 0);
    po.emails.get(1).sendKeys('  ');
    po.emailLabels.get(1).sendKeys('  ');
    expect(po.sectionEmails.count()).toBe(2);

    expect(po.sectionPhones.count()).toBe(1);
    po.phones.get(0).sendKeys('xx');
    po.clickSectionAdd('phone', 0);
    po.phones.get(1).sendKeys('  ');
    po.phoneLabels.get(1).sendKeys('  ');
    expect(po.sectionPhones.count()).toBe(2);

    expect(po.sectionAddrs.count()).toBe(1);
    po.addrs.get(0).sendKeys('xx');
    po.clickSectionAdd('addr', 0);
    po.addrs.get(1).sendKeys('  ');
    po.addrLabels.get(1).sendKeys('  ');
    expect(po.sectionAddrs.count()).toBe(2);

    expect(po.sectionWebsites.count()).toBe(1);
    po.websites.get(0).sendKeys('xx');
    po.clickSectionAdd('website', 0);
    po.websites.get(1).sendKeys('  ');
    po.websiteLabels.get(1).sendKeys('  ');
    expect(po.sectionWebsites.count()).toBe(2);

    po.takeDownSubmit();
    browser.refresh();
    po.putUpDialogEdit(3);
    expect(po.sectionEmails.count()).toBe(1);
    expect(po.emails.get(0).getAttribute('value')).toBe('x@x.xx');
    expect(po.sectionPhones.count()).toBe(1);
    expect(po.phones.get(0).getAttribute('value')).toBe('xx');
    expect(po.sectionAddrs.count()).toBe(1);
    expect(po.addrs.get(0).getAttribute('value')).toBe('xx');
    expect(po.sectionWebsites.count()).toBe(1);
    expect(po.websites.get(0).getAttribute('value')).toBe('xx');
    po.refreshDbAndPage();
  });

  it('should update all fields when submitted and reopened (add then edit)', () => {
    // add
    po.putUpDialogAdd();
    po.name.sendKeys('name');
    po.company.sendKeys('company');
    po.jobTitle.sendKeys('job title');
    po.emails.get(0).sendKeys('x@x.xx');
    po.emailLabels.get(0).click();
    expect(po.selectOptions.count()).toBe(3);
    po.emailLabels.get(0).sendKeys('w');
    browser.sleep(200);
    expect(po.selectOptions.count()).toBe(1);
    po.clickAutoCompleteOption('Work');
    po.phonePrefixes.get(0).click();
    browser.sleep(200);
    po.clickSelectOption(1);
    po.phones.get(0).sendKeys('555-1212');
    po.phoneLabels.get(0).sendKeys('phone label');
    po.addrs.get(0).sendKeys('addr one\naddr two');
    po.addrLabels.get(0).sendKeys('addr label');
    po.websites.get(0).sendKeys('website');
    po.websiteLabels.get(0).sendKeys('website label');
    po.notes.sendKeys('notes one\nnotes two');
    po.takeDownSubmit();
    browser.refresh();
    po.putUpDialogEdit(3);
    expect(po.name.getAttribute('value')).toBe('name')
    expect(po.company.getAttribute('value')).toBe('company')
    expect(po.jobTitle.getAttribute('value')).toBe('job title')
    expect(po.emails.get(0).getAttribute('value')).toBe('x@x.xx')
    expect(po.emailLabels.get(0).getAttribute('value')).toBe('Work')
    expect(po.phonePrefixes.get(0).getText()).toContain('USA');
    expect(po.phones.get(0).getAttribute('value')).toBe('555-1212')
    expect(po.phoneLabels.get(0).getAttribute('value')).toBe('phone label')
    expect(po.addrs.get(0).getAttribute('value')).toBe('addr one\naddr two')
    expect(po.addrLabels.get(0).getAttribute('value')).toBe('addr label')
    expect(po.websites.get(0).getAttribute('value')).toBe('website')
    expect(po.websiteLabels.get(0).getAttribute('value')).toBe('website label')
    expect(po.notes.getAttribute('value')).toBe('notes one\nnotes two')

    // edit
    po.name.sendKeys('2');
    po.company.sendKeys('2');
    po.jobTitle.sendKeys('2');
    po.emails.get(0).clear();
    po.emails.get(0).sendKeys('x2@x.xx');
    po.emailLabels.get(0).sendKeys('2');
    po.phonePrefixes.get(0).click();
    browser.sleep(200);
    po.clickSelectOption(55);
    po.phones.get(0).clear();
    po.phones.get(0).sendKeys('666-1313');
    po.phoneLabels.get(0).sendKeys('2');
    po.addrs.get(0).sendKeys('2');
    po.addrLabels.get(0).sendKeys('2');
    po.websites.get(0).sendKeys('2');
    po.websiteLabels.get(0).sendKeys('2');
    po.notes.sendKeys('2');
    po.takeDownSubmit();
    browser.refresh();
    po.putUpDialogEdit(3);
    expect(po.name.getAttribute('value')).toBe('name2')
    expect(po.company.getAttribute('value')).toBe('company2')
    expect(po.jobTitle.getAttribute('value')).toBe('job title2')
    expect(po.emails.get(0).getAttribute('value')).toBe('x2@x.xx')
    expect(po.emailLabels.get(0).getAttribute('value')).toBe('Work2')
    expect(po.phonePrefixes.get(0).getText()).toContain('Brazil');
    expect(po.phones.get(0).getAttribute('value')).toBe('666-1313')
    expect(po.phoneLabels.get(0).getAttribute('value')).toBe('phone label2')
    expect(po.addrs.get(0).getAttribute('value')).toBe('addr one\naddr two2')
    expect(po.addrLabels.get(0).getAttribute('value')).toBe('addr label2')
    expect(po.websites.get(0).getAttribute('value')).toBe('website2')
    expect(po.websiteLabels.get(0).getAttribute('value')).toBe('website label2')
    expect(po.notes.getAttribute('value')).toBe('notes one\nnotes two2')
    po.takeDownCancel();
  });

});

