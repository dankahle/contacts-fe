import {$, $$, browser, ElementFinder, protractor} from 'protractor';
import {LabelPO} from './labels.po';
import {LabelEditPO} from '../dialogs/label-edit.po';
import {ContactListPO} from '../list/contact-list.po';
import {LabelDeletePO} from '../dialogs/label-delete.po';

const EC = protractor.ExpectedConditions;

describe('leftnav labels', () => {
  const po = new LabelPO();
  const poContactList = new ContactListPO();
  const poLabelEdit = new LabelEditPO();
  const poLabelDelete = new LabelDeletePO;
  const active = 'active';

  beforeAll(() => {
    const start = Date.now();
    browser.get('/');
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
    expect(poContactList.getNames()).toEqual(['brenda - Brenda Co', 'jane - Jane Co', 'martha - Martha Co']);
    po.labels.get(1).click();
    expect(po.hasClass(po.labelContacts, active)).toBe(false);
    labelIsActive(1);
    expect(poContactList.getNames()).toEqual(['brenda - Brenda Co', 'jane - Jane Co']);
    po.labels.get(2).click();
    expect(po.hasClass(po.labelContacts, active)).toBe(false);
    labelIsActive(2);
    expect(poContactList.getNames()).toEqual([]);
    po.labelContacts.click();
    expect(po.hasClass(po.labelContacts, active)).toBe(true);
    labelIsActive(-1);
    expect(poContactList.getNames()).toEqual(['brenda - Brenda Co', 'jane - Jane Co', 'martha - Martha Co']);
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
    po.clickDelete(po.labels.get(2));
    expect(po.labels.count()).toBe(3);
    expect(po.getLabelText(po.labels.get(0))).toBe('label one');
    expect(po.getLabelText(po.labels.get(1))).toBe('label two');
    expect(po.getLabelText(po.labels.get(2))).toBe('label zthree');
  });

  it('should edit label', () => {
    po.createLabel('Label Two2')
    const label = po.labels.get(2);
    expect(po.getLabelText(label)).toBe('Label Two2')
    po.editLabel(label, 'Label Two3');
    expect(po.getLabelText(label)).toBe('Label Two3');
    po.clickDelete(label);
  });

  it('should show the correct number of contacts', async () => {
    expect(po.labels.get(0).getText()).toContain('label one\n(2)');
    expect(po.labels.get(1).getText()).toContain('label two\n(2)');
    const zthreeText = await po.labels.get(2).getText();
    expect(zthreeText).toContain('label zthree');
    expect(zthreeText).not.toContain('(');
  });

  fit('should delete label two and keep contacts (in contacts)', async () => {
    await po.initDatabase();
    browser.refresh();
    po.labelContacts.click();
    expect(po.labels.count()).toBe(3);
    po.deleteLabelWithContacts(po.labels.get(1), 'keep');
    browser.sleep(3000);
    expect(po.labels.count()).toBe(2);
    expect(po.labels.getText()).not.toContain('label two');
    expect(browser.getCurrentUrl()).toBe(po.rootUrl);
    const contactNames = await poContactList.getNames();
    expect(contactNames).toEqual(['brenda', 'jane', 'martha']);
  })

  it('should delete label two and keep contacts (in label one)', async () => {
    await po.initDatabase();
    po.labelContacts.click();
    expect(po.labels.count()).toBe(3);
    po.clickDelete(po.labels.get(1)); // delete label two, which has brenda/jane
    poLabelDelete.radioKeep.click();
    poLabelDelete.submit.click();
    expect(po.labels.count()).toBe(2);
    expect(po.labels.getText()).not.toContain('label two');
    const contactNames = await poContactList.getNames();
    expect(browser.getCurrentUrl()).toBe('/');
    expect(contactNames).toEqual(['brenda', 'jane', 'martha']);
  })

  it('should delete label two and keep contacts (in label two)', async () => {
    await po.initDatabase();
    po.labelContacts.click();
    expect(po.labels.count()).toBe(3);
    po.clickDelete(po.labels.get(1)); // delete label two, which has brenda/jane
    poLabelDelete.radioKeep.click();
    poLabelDelete.submit.click();
    expect(po.labels.count()).toBe(2);
    expect(po.labels.getText()).not.toContain('label two');
    const contactNames = await poContactList.getNames();
    expect(browser.getCurrentUrl()).toBe('/');
    expect(contactNames).toEqual(['brenda', 'jane', 'martha']);
  })

  it('should delete label two and toss contacts (in contacts)', async () => {
    await po.initDatabase();
    po.labelContacts.click();
    expect(po.labels.count()).toBe(3);
    po.clickDelete(po.labels.get(1)); // delete label two, which has brenda/jane
    poLabelDelete.radioKeep.click();
    poLabelDelete.submit.click();
    expect(po.labels.count()).toBe(2);
    expect(po.labels.getText()).not.toContain('label two');
    const contactNames = await poContactList.getNames();
    expect(browser.getCurrentUrl()).toBe('/');
    expect(contactNames).toEqual(['martha']);
  });

  it('', async () => {
    await po.initDatabase();

  });

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

