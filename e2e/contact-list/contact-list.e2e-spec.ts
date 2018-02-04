import {$, $$, browser, ElementFinder, protractor} from 'protractor';
import {LabelEditPO} from '../dialogs/label-edit.po';
import {ContactListPO} from '../contact-list/contact-list.po';
import {LabelDeletePO} from '../dialogs/label-delete.po';
import {LabelPO} from '../leftnav/labels.po';

const EC = protractor.ExpectedConditions;

describe('leftnav labels', () => {
  const po = new LabelPO();
  const poContactList = new ContactListPO();
  const poLabelEdit = new LabelEditPO();
  const poLabelDelete = new LabelDeletePO;
  const active = 'active';

  beforeAll(() => {
    browser.get('/');
  });

  it('should show no contacts view when label zthree is selected', () => {
  });

});

