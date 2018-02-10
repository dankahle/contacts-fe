import {$, $$, browser, ElementFinder, protractor} from 'protractor';
import {LabelEditPO} from '../dialogs/label-edit.po';
import {ContactListPO} from '../contact-list/contact-list.po';
import {LabelDeletePO} from '../dialogs/label-delete.po';
import {LabelPO} from '../leftnav/label.po';
import {ContactMoreActionsPO} from './contact-more-actions.po';
import {CommonPO} from '../common.po';
import {ContactListItemPO} from '../contact-list/contact-list-item.po';
import {ContactDetailPO} from './contact-detail.po';
import {ContactDeletePO} from './contact-delete.po';

const EC = protractor.ExpectedConditions;
const po = new ContactMoreActionsPO();
const poCommon = new CommonPO();
const poContactList = new ContactListPO();
const poLabel = new LabelPO();
let poContactListItem;
const poContactDetail = new ContactDetailPO();
const poContactDelete = new ContactDeletePO();

describe('##### contact more actions tests', () => {

  describe('contact list item', () => {

    beforeAll(() => {
      poCommon.refreshDbAndSetPage('/');
      poContactListItem = new ContactListItemPO(poContactList.contacts.get(1));
    });

    it('should show all options (label contacts)', () => {
      expect(po.menu.isPresent()).toBe(false);
      poContactListItem.clickMoreActions();
      expect(po.menu.isPresent()).toBe(true);
      expect(po.itemRemoveFromLabel.isPresent()).toBe(false);
      expect(po.itemDelete.isPresent()).toBe(true);
      expect(po.itemLabels.count()).toBe(3);
      expect(po.itemLabels.getText()).toEqual(['label one', 'label two', 'label zthree']);
      po.takeDown();
    });

    it('should show all options (label two)', () => {
      expect(po.menu.isPresent()).toBe(false);
      poLabel.labels.get(1).click();
      poContactListItem.clickMoreActions();
      expect(po.menu.isPresent()).toBe(true);
      expect(po.itemRemoveFromLabel.isPresent()).toBe(true);
      expect(po.itemDelete.isPresent()).toBe(true);
      expect(po.itemLabels.count()).toBe(3);
      expect(po.itemLabels.getText()).toEqual(['label one', 'label two', 'label zthree']);
      po.takeDown();
      poLabel.labelContacts.click();
    });

    it('should delete jane (contacts)', () => {
      expect(poContactList.getNames()).toEqual(['Brenda', 'jane - jane co', 'Martha Co']);
      poContactList.deleteContact(poContactList.contacts.get(1));
      expect(poContactList.getNames()).toEqual(['Brenda', 'Martha Co']);
      browser.refresh();
      expect(poContactList.getNames()).toEqual(['Brenda', 'Martha Co']);
    });

    it('should delete jane (label two)', () => {
      po.refreshDbAndPage();
      expect(poContactList.getNames()).toEqual(['Brenda', 'jane - jane co', 'Martha Co']);
      poLabel.labels.get(1).click();
      expect(poContactList.getNames()).toEqual(['Brenda', 'jane - jane co']);
      poContactList.deleteContact(poContactList.contacts.get(1));
      expect(poContactList.getNames()).toEqual(['Brenda']);
      browser.refresh();
      expect(poContactList.getNames()).toEqual(['Brenda']);
      poLabel.labelContacts.click();
      expect(poContactList.getNames()).toEqual(['Brenda', 'Martha Co']);
    });

    it('should remove jane from label two', () => {
      po.refreshDbAndPage();
      checkLabels();
      poLabel.labels.get(1).click(); // label two
      poContactListItem = new ContactListItemPO(poContactList.contacts.get(1));
      poContactListItem.clickMoreActions();
      po.itemRemoveFromLabel.click();
      po.waitForDown();
      expect(poLabel.labelActive.getText()).toContain('label two');
      checkLabelsNoJaneInLabelTwo();
      browser.refresh();
      checkLabelsNoJaneInLabelTwo();
      poLabel.labelContacts.click();
    });

    it('should remove jane from label two and add to label zthree', () => {
      po.refreshDbAndPage();
      checkLabels();
      poContactListItem = new ContactListItemPO(poContactList.contacts.get(1));
      poContactListItem.clickMoreActions();
      expect(po.itemLabels.getText()).toEqual(['label one', 'label two', 'label zthree']);
      po.itemLabels.get(1).click();
      po.itemLabels.get(2).click();
      po.takeDown();
      po.waitForDown();
      checkLabelsJane_removeLabelTwoAddLabelThree();
      browser.refresh();
      checkLabelsJane_removeLabelTwoAddLabelThree();
      poLabel.labelContacts.click();
    });

  });


  describe('contact detail', () => {

    beforeAll(() => {
      poCommon.refreshDbAndSetPage('/');
    });

    function putUpJaneDetailMoreActions() {
      poContactListItem = new ContactListItemPO(poContactList.contacts.get(1));
      poContactListItem.clickDetail();
      poContactDetail.moreActions.click();
      po.waitForUp();
    }

    it('should show all options (label contacts)', () => {
      expect(po.menu.isPresent()).toBe(false);
      putUpJaneDetailMoreActions();
      expect(po.menu.isPresent()).toBe(true);
      expect(po.itemRemoveFromLabel.isPresent()).toBe(false);
      expect(po.itemDelete.isPresent()).toBe(true);
      expect(po.itemLabels.count()).toBe(3);
      expect(po.itemLabels.getText()).toEqual(['label one', 'label two', 'label zthree']);
      po.takeDown();
      poContactDetail.takeDownClose();
    });

    it('should show all options (label two)', () => {
      poLabel.labels.get(1).click();
      expect(po.menu.isPresent()).toBe(false);
      putUpJaneDetailMoreActions();
      expect(po.menu.isPresent()).toBe(true);
      expect(po.itemRemoveFromLabel.isPresent()).toBe(true);
      expect(po.itemDelete.isPresent()).toBe(true);
      expect(po.itemLabels.count()).toBe(3);
      expect(po.itemLabels.getText()).toEqual(['label one', 'label two', 'label zthree']);
      po.takeDown();
      poContactDetail.takeDownClose();
      poLabel.labelContacts.click();
    });

    it('should delete jane (contacts)', () => {
      po.refreshDbAndPage();
      putUpJaneDetailMoreActions();
      po.itemDelete.click();
      po.waitForDown();
      poContactDelete.waitForUp();
      poContactDelete.submit.click();
      poContactDelete.waitForDown();
      poContactDetail.waitForDown();
      expect(poContactList.getNames()).toEqual(['Brenda', 'Martha Co']);
      browser.refresh();
      expect(poContactList.getNames()).toEqual(['Brenda', 'Martha Co']);
    });

    it('should delete jane (label two)', () => {
      po.refreshDbAndPage();
      poLabel.labels.get(1).click();
      expect(poContactList.getNames()).toEqual(['Brenda', 'jane - jane co']);
      putUpJaneDetailMoreActions();
      po.itemDelete.click();
      po.waitForDown();
      poContactDelete.waitForUp();
      poContactDelete.submit.click();
      poContactDelete.waitForDown();
      poContactDetail.waitForDown();
      expect(poContactList.getNames()).toEqual(['Brenda']);
      browser.refresh(); // refresh while on label two
      expect(poContactList.getNames()).toEqual(['Brenda']);
      poLabel.labelContacts.click();
      expect(poContactList.getNames()).toEqual(['Brenda', 'Martha Co']);
      browser.refresh();
      expect(poContactList.getNames()).toEqual(['Brenda', 'Martha Co']);
    });

    it('should remove jane from label two', () => {
      po.refreshDbAndPage();
      poLabel.labels.get(1).click();
      putUpJaneDetailMoreActions();
      expect(po.menu.isPresent()).toBe(true);
      po.itemRemoveFromLabel.click();
      po.waitForDown();
      poContactDetail.waitForDown();
      checkLabelsNoJaneInLabelTwo();
      browser.refresh();
      checkLabelsNoJaneInLabelTwo();
      poLabel.labelContacts.click();
    });

    it('should remove jane from label two and add to label zthree', () => {
      po.refreshDbAndPage();
      putUpJaneDetailMoreActions();
      expect(poContactDetail.labels.getText()).toEqual(['label one', 'label two']);
      expect(po.menu.isPresent()).toBe(true);
      po.itemLabels.get(1).click();
      po.itemLabels.get(2).click();
      po.takeDown();
      expect(poContactDetail.labels.getText()).toEqual(['label one', 'label zthree']);
      poContactDetail.takeDownClose();
      checkLabelsJane_removeLabelTwoAddLabelThree();
      browser.refresh();
      checkLabelsJane_removeLabelTwoAddLabelThree();
    });

  });

});

function checkLabels() {
  poLabel.labelContacts.click();
  expect(poContactList.getNames()).toEqual(['Brenda', 'jane - jane co', 'Martha Co']);
  poLabel.labels.get(0).click();
  expect(poContactList.getNames()).toEqual(['jane - jane co', 'Martha Co']);
  poLabel.labels.get(1).click();
  expect(poContactList.getNames()).toEqual(['Brenda', 'jane - jane co']);
  poLabel.labels.get(2).click();
  expect(poContactList.getNames()).toEqual([]);
  poLabel.labelContacts.click();
}

function checkLabelsNoJaneInLabelTwo() {
  poLabel.labelContacts.click();
  expect(poContactList.getNames()).toEqual(['Brenda', 'jane - jane co', 'Martha Co']);
  poLabel.labels.get(0).click();
  expect(poContactList.getNames()).toEqual(['jane - jane co', 'Martha Co']);
  poLabel.labels.get(1).click();
  expect(poContactList.getNames()).toEqual(['Brenda']);
  poLabel.labels.get(2).click();
  expect(poContactList.getNames()).toEqual([]);
  poLabel.labelContacts.click();
}

function checkLabelsJane_removeLabelTwoAddLabelThree() {
  poLabel.labelContacts.click();
  expect(poContactList.getNames()).toEqual(['Brenda', 'jane - jane co', 'Martha Co']);
  poLabel.labels.get(0).click();
  expect(poContactList.getNames()).toEqual(['jane - jane co', 'Martha Co']);
  poLabel.labels.get(1).click();
  expect(poContactList.getNames()).toEqual(['Brenda']);
  poLabel.labels.get(2).click();
  expect(poContactList.getNames()).toEqual(['jane - jane co']);
  poLabel.labelContacts.click();
}
