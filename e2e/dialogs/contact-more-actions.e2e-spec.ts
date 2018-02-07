import {$, $$, browser, ElementFinder, protractor} from 'protractor';
import {LabelEditPO} from '../dialogs/label-edit.po';
import {ContactListPO} from '../contact-list/contact-list.po';
import {LabelDeletePO} from '../dialogs/label-delete.po';
import {LabelPO} from '../leftnav/labels.po';
import {ContactMoreActionsPO} from './contact-more-actions.po';
import {CommonPO} from '../common.po';
import {ContactListItemPO} from '../contact-list/contact-list-item.po';

const EC = protractor.ExpectedConditions;
const po = new ContactMoreActionsPO();
const poCommon = new CommonPO();
const poContactList = new ContactListPO();
let poContactListItem;

describe('##### contact more actions tests', () => {

  describe('contact list item', () => {

    beforeAll(() => {
      poCommon.refreshDbAndSetPage('/');
      poContactListItem = new ContactListItemPO(poContactList.contacts.get(1));
    });

    fit('should show all options (contacts label)', () => {
      expect(po.menu.isPresent()).toBe(false);
      poContactListItem.clickMoreActions();
      expect(po.menu.isPresent()).toBe(true);
      po.takeDown();
    });

    it('should show all options (contacts)', () => {

    });

  });


  describe('contact detail;', () => {

    beforeAll(() => {
      poCommon.refreshDbAndSetPage('/');
    });

  });



});

