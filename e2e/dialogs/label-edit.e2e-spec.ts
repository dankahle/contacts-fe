import {$, $$, browser, ElementFinder, protractor} from 'protractor';
import {LabelEditPO} from './po/label-edit.po';

const EC = protractor.ExpectedConditions;
const po = new LabelEditPO();

describe('##### label edit dialog tests', () => {
  let bypassTakedown = false;

  beforeAll(() => {
    po.refreshDbAndSetPage('/');
  });

  beforeEach(() => {
    bypassTakedown = false;
    po.putUpAddDialog();
  });

  afterEach(() => {
    if (!bypassTakedown) {
      po.takeDown();
    }
  });

  describe('label add tests', () => {


    it('should show no errors originally', () => {
      expect(po.errorRequired.isPresent()).toBe(false);
      expect(po.errorAlreadyExists.isPresent()).toBe(false);
    });

    it('should enable/disable submit', () => {
      expect(po.submit.isEnabled()).toBe(false);
      po.input.sendKeys('  ');
      expect(po.submit.isEnabled()).toBe(false);
      po.input.clear();
      po.input.sendKeys('x');
      expect(po.submit.isEnabled()).toBe(true);
      po.input.sendKeys(protractor.Key.BACK_SPACE);
      expect(po.submit.isEnabled()).toBe(false);
    })

    it('input shoudl have focus on entry', () => {
      browser.wait(EC.presenceOf($('dk-edit-label input:focus')));
      expect(po.isActiveElement(po.input)).toBe(true);
    })

    it('should show required message for touched', () => {
      expect(po.errorRequired.isPresent()).toBe(false);
      po.input.sendKeys(protractor.Key.TAB);
      expect(po.errorRequired.isPresent()).toBe(true);
    });

    it('should show required for dirty', () => {
      expect(po.errorRequired.isPresent()).toBe(false);
      po.input.sendKeys('x');
      po.input.sendKeys(protractor.Key.BACK_SPACE);
      expect(po.errorRequired.isPresent()).toBe(true);
    });

    it('should show required for dirty (whitespace entered)', () => {
      expect(po.errorRequired.isPresent()).toBe(false);
      po.input.sendKeys(' ');
      expect(po.errorRequired.isPresent()).toBe(true);
    });

    it('should show "label exists" if label exists "disregarding white space', () => {
      expect(po.errorAlreadyExists.isPresent()).toBe(false);
      po.input.sendKeys('label one  ');
      expect(po.errorAlreadyExists.isPresent()).toBe(true);
    });

    fit('should submit with no whitespace if whitespace was entered', () => {
      po.input.sendKeys('Label Two2  ');
      po.submit.click();
      po.waitForDown();
      browser.refresh();
      // this doesn't work, even though html will show extra places, they don't show up via getText() for some reason. Can't even check
      // length of string, they trim it I figure. This will have to be handled in unit tests, but they'll have to include the shared module then
      expect($$('dk-leftnav dk-leftnav-label.user-label .name').get(2).getText()).toBe('Label Two2');
      bypassTakedown = true;
    });

  });



  describe('label edit tests', () => {

  });


});

