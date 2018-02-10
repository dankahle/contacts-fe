import {$, $$, browser, ElementFinder, protractor} from 'protractor';
import {LabelEditPO} from './label-edit.po';

const EC = protractor.ExpectedConditions;
const po = new LabelEditPO();

xdescribe('##### label edit dialog tests', () => {

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
    * should show required for touched (whitespace NOT entered)
* should show required for dirty (whitespace entered)
* should disable submit if whitespace only in entry
* should show "label exist" if label exist "disregarding white space"
* should submit with no whitespace if whitespace was entered

     */

    xit('should show no errors originally', () => {
      expect(po.errorRequired.isPresent).toBe(false);
      expect(po.errorAlreadyExists.isPresent).toBe(false);
    });


  });



  describe('label edit tests', () => {

  });


});

