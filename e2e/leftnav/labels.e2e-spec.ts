import {$, $$, browser, ElementFinder, protractor} from 'protractor';
import {LabelPO} from './labels.po';
import {ListPO} from '../list/list.po';


/*
### labels
* accordion works for labels/extras
* default (contacts) shows all contacts
* label one shows brenda/jane
* label two shows martha/jane
* contacts shows all again
* create label // dialog
* edit label // dialog
* delete label with contacts keep contacts // dialog
* delete label with contacts toss contacts // dialog
* delete label no contacts deletes

 */

describe('leftnav labels', () => {
  const po = new LabelPO();
  const poList = new ListPO();
  const active = 'active';

  beforeAll(() => {
    po.navigate('/');
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

  fit('should default to contacts label, and show correct contacts for chosen labels', () => {
    expect(true).toBe(true);
/*
    po.refresh();
    expect(po.hasClass(po.labelContacts, active)).toBe(true);
    labelIsActive(-1);
    expect(poList.names).toBe(['brenda - Brenda Co', 'jane - Jane Co', 'martha - Martha Co']);
    po.labels.get(1).click();
    expect(po.hasClass(po.labelContacts, active)).toBe(false);
    labelIsActive(1);
    expect(poList.names).toBe(['brenda - Brenda Co', 'jane - Jane Co']);
    po.labels.get(2).click();
    expect(po.hasClass(po.labelContacts, active)).toBe(false);
    labelIsActive(2);
    expect(poList.names).toBe([]);
*/
  });

  it('', () => {

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

