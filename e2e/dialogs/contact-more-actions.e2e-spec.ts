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

  describe('contact list item more actions', () => {

    beforeAll(() => {
      poCommon.refreshDbAndSetPage('/');
      poContactListItem = new ContactListItemPO(poContactList.contacts.get(1));
    });

    it('should be down initially', () => {
      expect(po.menu.isPresent()).toBe(false);
      poContactListItem.clickMoreActions();
      expect(po.menu.isPresent()).toBe(true);
    });

  });


  describe('contact detail more actions', () => {

    beforeAll(() => {
      poCommon.refreshDbAndSetPage('/');
    });

  });



});

