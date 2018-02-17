import {$, $$, browser, ElementFinder, protractor} from 'protractor';
import {LabelEditPO} from './po/label-edit.po';
import {LabelDeletePO} from './po/label-delete.po';

const EC = protractor.ExpectedConditions;
const po = new LabelDeletePO();

describe('##### label edit dialog tests', () => {

  beforeAll(() => {
    po.refreshDbAndSetPage('/');
  });

  beforeEach(() => {
    po.putUpDeleteDialog();
  });

  afterEach(() => {
    po.takeDown();
  });

  it('should default to keep contacts', () => {
    expect(po.radioKeep.$('input').isSelected()).toBe(true);
    expect(po.radioToss.$('input').isSelected()).toBe(false);
  });

});

