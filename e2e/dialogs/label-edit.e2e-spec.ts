import {$, $$, browser, ElementFinder, protractor} from 'protractor';
import {LabelEditPO} from './po/label-edit.po';

const EC = protractor.ExpectedConditions;
const po = new LabelEditPO();

describe('##### label edit dialog tests', () => {

  beforeAll(() => {
    po.refreshDbAndSetPage('/');
  });

  beforeEach(() => {
    po.putUpAddDialog();
  });

  afterEach(() => {
    po.takeDown();
  });

  describe('label add tests', () => {

    /*
* submit disabled initially
* should show required for touched (whitespace NOT entered)
* should show required for dirty (whitespace entered)
* submit disabled if whitespace only in entry
* should show "label exists" if label exists "disregarding white space"
* should submit with no whitespace if whitespace was entered
* label exists shows if label already exists

     */

    it('should show no errors originally', () => {
      expect(po.errorRequired.isPresent()).toBe(false);
      expect(po.errorAlreadyExists.isPresent()).toBe(false);
    });

    fit('should enable/disable submit', () => {
      expect(po.submit.isEnabled()).toBe(false);
      po.input.sendKeys('  ');
      expect(po.submit.isEnabled()).toBe(false);
      po.input.clear();
      po.input.sendKeys('x');
      expect(po.submit.isEnabled()).toBe(true);
      po.input.sendKeys(protractor.Key.BACK_SPACE);
      expect(po.submit.isEnabled()).toBe(false);
    })


    it('should enable/disable submit', () => {

    });


  });



  describe('label edit tests', () => {

  });


});

