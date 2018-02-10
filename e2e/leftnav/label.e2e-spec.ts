import {$, $$, browser, ElementFinder, protractor} from 'protractor';
import {LabelPO} from './label.po';
import {LabelEditPO} from '../dialogs/po/label-edit.po';
import {ContactListPO} from '../contact-list/contact-list.po';
import {LabelDeletePO} from '../dialogs/po/label-delete.po';

const EC = protractor.ExpectedConditions;

describe('##### leftnav labels tests', () => {
  const po = new LabelPO();
  const poContactList = new ContactListPO();
  const poLabelEdit = new LabelEditPO();
  const poLabelDelete = new LabelDeletePO;
  const active = 'active';

  beforeAll(() => {
    po.refreshDbAndSetPage('/');
  });

  it('should open/close accordion sections', () => {
    expect($(po.qLabelsBody).isDisplayed()).toBe(true)
    po.closeAccordHeading('labels');
    expect($(po.qLabelsBody).isDisplayed()).toBe(false);
    po.openAccordHeading('labels');
    expect($(po.qLabelsBody).isDisplayed()).toBe(true);

    expect($(po.qExtrasBody).isDisplayed()).toBe(false)
    po.openAccordHeading('extras');
    expect($(po.qExtrasBody).isDisplayed()).toBe(true);
    expect($(po.qLabelsBody).isDisplayed()).toBe(true); // should keep multiple sections open at same time
    po.closeAccordHeading('extras');
    expect($(po.qExtrasBody).isDisplayed()).toBe(false);
  });

  it('should default to contacts label, and show correct contacts for chosen labels', async () => {
    expect(po.hasClass(po.labelContacts, active)).toBe(true);
    labelIsActive(-1);
    expect(poContactList.getNames()).toEqual(['Brenda', 'jane - jane co', 'Martha Co']);
    po.labels.get(1).click();
    expect(po.hasClass(po.labelContacts, active)).toBe(false);
    labelIsActive(1);
    expect(poContactList.getNames()).toEqual(['Brenda', 'jane - jane co']);
    browser.refresh();
    labelIsActive(1);
    expect(poContactList.getNames()).toEqual(['Brenda', 'jane - jane co']);
    po.labels.get(2).click();
    expect(po.hasClass(po.labelContacts, active)).toBe(false);
    labelIsActive(2);
    expect(poContactList.getNames()).toEqual([]);
    po.labelContacts.click();
    expect(po.hasClass(po.labelContacts, active)).toBe(true);
    labelIsActive(-1);
    expect(poContactList.getNames()).toEqual(['Brenda', 'jane - jane co', 'Martha Co']);
  });

  it('should create label and delete it with no contacts', async () => {
    expect(po.labels.count()).toBe(3);
    expect(po.getLabelText(po.labels.get(0))).toBe('label one');
    expect(po.getLabelText(po.labels.get(1))).toBe('label two');
    expect(po.getLabelText(po.labels.get(2))).toBe('label zthree');
    po.createLabel('Label Two2')
    expect(po.labels.count()).toBe(4);
    expect(po.getLabelText(po.labels.get(0))).toBe('label one');
    expect(po.getLabelText(po.labels.get(1))).toBe('label two');
    expect(po.getLabelText(po.labels.get(2))).toBe('Label Two2');
    expect(po.getLabelText(po.labels.get(3))).toBe('label zthree');
    browser.refresh();
    expect(po.labels.count()).toBe(4);
    expect(po.getLabelText(po.labels.get(0))).toBe('label one');
    expect(po.getLabelText(po.labels.get(1))).toBe('label two');
    expect(po.getLabelText(po.labels.get(2))).toBe('Label Two2');
    expect(po.getLabelText(po.labels.get(3))).toBe('label zthree');
    po.clickDeleteNoContacts(po.labels.get(2));
    expect(po.labels.count()).toBe(3);
    expect(po.getLabelText(po.labels.get(0))).toBe('label one');
    expect(po.getLabelText(po.labels.get(1))).toBe('label two');
    expect(po.getLabelText(po.labels.get(2))).toBe('label zthree');
  });

  it('should edit label', () => {
    po.createLabel('Label Two2')
    let label = po.labels.get(2);
    expect(po.getLabelText(label)).toBe('Label Two2')
    po.editLabel(label, 'Label Two3');
    expect(po.getLabelText(label)).toBe('Label Two3');
    browser.refresh();
    label = po.labels.get(2);
    expect(po.labels.count()).toBe(4);
    expect(po.getLabelText(label)).toBe('Label Two3');
    po.clickDeleteNoContacts(label);
  });

  it('should show the correct number of contacts in parenthesis (x)', async () => {
    expect(po.labels.get(0).getText()).toContain('label one\n(2)');
    expect(po.labels.get(1).getText()).toContain('label two\n(2)');
    const zthreeText = await po.labels.get(2).getText();
    expect(zthreeText).toContain('label zthree');
    expect(zthreeText).not.toContain('(');
  });

  it('should delete label two and keep contacts (in contacts)', async () => {
    po.refreshDbAndPage();
    po.labelContacts.click();
    expect(po.labels.count()).toBe(3);
    po.deleteLabelWithContacts(po.labels.get(1), 'keep');
    expect(po.labelActive.equals(po.labelContacts)).toBe(true);
    expect(po.labels.count()).toBe(2);
    expect(po.labels.getText()).not.toContain('label two');
    expect(browser.getCurrentUrl()).toBe(po.rootUrl);
    const contactNames = await poContactList.getNames();
    expect(contactNames).toEqual(['Brenda', 'jane - jane co', 'Martha Co']);
    browser.refresh();
    expect(po.labels.count()).toBe(2);
    expect(po.labels.getText()).not.toContain('label two');
    expect(contactNames).toEqual(['Brenda', 'jane - jane co', 'Martha Co']);
  })

  it('should delete label two and keep contacts (in label one)', async () => {
    po.refreshDbAndPage();
    po.labels.get(0).click();
    expect(po.labels.count()).toBe(3);
    po.deleteLabelWithContacts(po.labels.get(1), 'keep');
    expect(po.labelActive.equals(po.labelContacts)).toBe(true);
    expect(po.labels.count()).toBe(2);
    expect(po.labels.getText()).not.toContain('label two');
    expect(browser.getCurrentUrl()).toBe(po.rootUrl);
    expect(await poContactList.getNames()).toEqual(['Brenda', 'jane - jane co', 'Martha Co']);
  })

  it('should delete label two and keep contacts (in label two)', async () => {
    po.refreshDbAndPage();
    po.labels.get(1).click();
    expect(po.labels.count()).toBe(3);
    po.deleteLabelWithContacts(po.labels.get(1), 'keep');
    expect(po.labelActive.equals(po.labelContacts)).toBe(true);
    expect(po.labels.count()).toBe(2);
    expect(po.labels.getText()).not.toContain('label two');
    expect(browser.getCurrentUrl()).toBe(po.rootUrl);
    expect(await poContactList.getNames()).toEqual(['Brenda', 'jane - jane co', 'Martha Co']);
  })

  it('should delete label two and toss contacts (in contacts)', async () => {
    po.refreshDbAndPage();
    po.labelContacts.click();
    expect(po.labels.count()).toBe(3);
    po.deleteLabelWithContacts(po.labels.get(1), 'toss');
    expect(po.labelActive.equals(po.labelContacts)).toBe(true);
    expect(po.labels.count()).toBe(2);
    expect(po.labels.getText()).not.toContain('label two');
    expect(browser.getCurrentUrl()).toBe(po.rootUrl);
    expect(await poContactList.getNames()).toEqual(['Martha Co']);
    browser.refresh();
    expect(await poContactList.getNames()).toEqual(['Martha Co']);
  })

  it('should delete label two and toss contacts (in label one)', async () => {
    po.refreshDbAndPage();
    po.labels.get(0).click();
    expect(po.labels.count()).toBe(3);
    po.deleteLabelWithContacts(po.labels.get(1), 'toss');
    expect(po.labelActive.equals(po.labelContacts)).toBe(true);
    expect(po.labels.count()).toBe(2);
    expect(po.labels.getText()).not.toContain('label two');
    expect(browser.getCurrentUrl()).toBe(po.rootUrl);
    const contactNames = await poContactList.getNames();
    expect(contactNames).toEqual(['Martha Co']);
  })

  it('should delete label two and toss contacts (in label two)', async () => {
    po.refreshDbAndPage();
    po.labels.get(1).click();
    expect(po.labels.count()).toBe(3);
    po.deleteLabelWithContacts(po.labels.get(1), 'toss');
    expect(po.labelActive.equals(po.labelContacts)).toBe(true);
    expect(po.labels.count()).toBe(2);
    expect(po.labels.getText()).not.toContain('label two');
    expect(browser.getCurrentUrl()).toBe(po.rootUrl);
    const contactNames = await poContactList.getNames();
    expect(contactNames).toEqual(['Martha Co']);
  })

  // only one label can be active at a time, pass in index of active one
  function labelIsActive(idx) {
    po.labels.each((label, i) => {
      if (i === idx) {
        expect(po.hasClass(label, active)).toBe(true);
      } else {
        expect(po.hasClass(label, active)).toBe(false);
      }
    });
  }

});

