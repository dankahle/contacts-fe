import {$, $$, browser, ElementFinder, protractor} from 'protractor';
import {LabelEditPO} from './po/label-edit.po';

const EC = protractor.ExpectedConditions;
const po = new LabelEditPO();

describe('##### label edit tests', () => {
  let bypassTakedown = false;

  beforeAll(() => {
    po.refreshDbAndSetPage('/');
  });

  beforeEach(() => {
    bypassTakedown = false;
    po.putUpEditDialog();
  });

  afterEach(() => {
    if (!bypassTakedown) {
      po.takeDown();
    }
  });

  it('should show no errors originally', () => {
    expect(po.errorRequired.isPresent()).toBe(false);
    expect(po.errorAlreadyExists.isPresent()).toBe(false);
  });

  it('should enable submit initially', () => {
    expect(po.submit.isEnabled()).toBe(true);
  })

  it('input should have focus on entry', () => {
    browser.wait(EC.presenceOf($('dk-edit-label input:focus')));
    expect(po.isActiveElement(po.input)).toBe(true);
  })

  it('should show "label exists" if label exists with/without white space', () => {
    expect(po.errorAlreadyExists.isPresent()).toBe(false);
    po.input.clear();
    po.input.sendKeys('label one');
    expect(po.errorAlreadyExists.isPresent()).toBe(true);
    po.input.clear();
    po.input.sendKeys('label one  ');
    expect(po.errorAlreadyExists.isPresent()).toBe(true);
    expect(po.submit.isEnabled()).toBe(false);
  });

  it('should NOT show "label exists" if label is "label two" with/without whitespace', () => {
    expect(po.errorAlreadyExists.isPresent()).toBe(false);
    po.input.clear();
    po.input.sendKeys('label two');
    expect(po.errorAlreadyExists.isPresent()).toBe(false);
    po.input.clear();
    po.input.sendKeys('label two  ');
    expect(po.errorAlreadyExists.isPresent()).toBe(false);
    expect(po.submit.isEnabled()).toBe(true);
  });

  it('should submit with no whitespace if whitespace was entered', () => {
    po.input.clear();
    po.input.sendKeys('Label Two2  ');
    po.submit.click();
    po.waitForDown();
    browser.refresh();
    // this doesn't work, even though html will show extra places, they don't show up via getText() for some reason. Can't even check
    // length of string, they trim it I figure. This will have to be handled in unit tests, but they'll have to include the shared module then
    expect($$('dk-leftnav dk-leftnav-label.user-label .name').get(1).getText()).toBe('Label Two2');
    bypassTakedown = true;
  });

});

