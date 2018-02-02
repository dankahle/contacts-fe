import {$, $$, browser, ElementFinder, protractor} from 'protractor';
import {LabelPO} from './labels.po';
import {ListPO} from '../list/list.po';
import {LabelEditPO} from '../dialogs/label-edit.po';

const EC = protractor.ExpectedConditions;

describe('leftnav labels', () => {
  const po = new LabelPO();
  const poList = new ListPO();
  const poLabelEdit = new LabelEditPO();
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
    expect(poList.getNames()).toEqual(['brenda - Brenda Co', 'jane - Jane Co', 'martha - Martha Co']);
    po.labels.get(1).click();
    expect(po.hasClass(po.labelContacts, active)).toBe(false);
    labelIsActive(1);
    expect(poList.getNames()).toEqual(['brenda - Brenda Co', 'jane - Jane Co']);
    po.labels.get(2).click();
    expect(po.hasClass(po.labelContacts, active)).toBe(false);
    labelIsActive(2);
    expect(poList.getNames()).toEqual([]);
    po.labelContacts.click();
    expect(po.hasClass(po.labelContacts, active)).toBe(true);
    labelIsActive(-1);
    expect(poList.getNames()).toEqual(['brenda - Brenda Co', 'jane - Jane Co', 'martha - Martha Co']);
  });

  fit('should create label', () => {
    expect(po.labels.count()).toBe(3);
    po.labelAdd.click();
    expect(poLabelEdit.dialog.isPresent()).toBe(true);
    poLabelEdit.input.sendKeys('Label Two2');
    poLabelEdit.submit.click();
    browser.wait(po.addedLabelIsPresent(4));
    po.addedLabel = po.labels.get(2);
    expect(po.addedLabel.$('.name').getText()).toBe('Label Two2');
  });

  fit('should edit label', () => {
    po.clickEdit(po.addedLabel);
    expect(poLabelEdit.dialog.isPresent()).toBe(true);
    poLabelEdit.input.clear();
    poLabelEdit.input.sendKeys('Label Two3');
    poLabelEdit.submit.click();
    browser.wait(EC.stalenessOf(poLabelEdit.dialog));
    expect(po.addedLabel.$('.name').getText()).toBe('Label Two3');
  });

  it('', () => {

  });

  it('', () => {

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

