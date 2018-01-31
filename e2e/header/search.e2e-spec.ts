import { SearchPO } from './search.po';
import {$, $$, browser, ElementFinder, protractor} from 'protractor';
import {LabelPO} from '../leftnav/labels.po';

const EC = protractor.ExpectedConditions;

describe('search tests', () => {
  const po = new SearchPO();
  let poLabel: LabelPO;

  beforeAll(() => {
    po.navigate('/');
    poLabel = new LabelPO();
  });

  it('should show clear icon when input has text', () => {
    browser.explore();
    expect(po.divClear.isDisplayed()).toBe(false);
    po.enterText('x');
    expect(po.divClear.isDisplayed()).toBe(true);
    po.enterText(protractor.Key.BACK_SPACE);
    expect(po.divClear.isDisplayed()).toBe(false);
  });

  it('should clear the text', async () => {
    expect(po.divClear.isDisplayed()).toBe(false);
    po.enterText('lala');
    const sv = po.getSearchValue();
    expect(po.getSearchValue()).toBe('lala');
    browser.actions()
      .mouseMove(po.divClear)
      .click()
      .perform();
    // po.clearClick();
    expect(po.getSearchValue()).toBe('');
  });

  it('should set focus to input when you click on search icon',  () => {
    $('body').click();
    expect(po.isInputFocused()).toBe(false);
    po.searchIconClick();
    expect(po.isInputFocused()).toBe(true);
  });

  it('should set focus to input when you click on search icon - switchTo().activeElement()',  () => {
    $('body').click();
    expect(po.input.equals(browser.driver.switchTo().activeElement())).toBe(false);
    po.searchIconClick();
    expect(po.input.equals(browser.driver.switchTo().activeElement())).toBe(true);
  });

  it('should only have jane for "j", then nothing for backspace', async () =>  {
    expect((await po.getDropdownChoices()).length).toBe(0);
    po.enterText('j');
    browser.wait(EC.presenceOf($('.mat-option-text')));
    expect(po.getDropdownChoices()).toEqual(['jane - jane1@gmail.com' ]);
    po.enterText(protractor.Key.BACK_SPACE);
    expect((await po.getDropdownChoices()).length).toBe(0);
  })

  it('should have brenda/jane for "n"', async () =>  {
    expect((await po.getDropdownChoices()).length).toBe(0);
    po.enterText('n');
    browser.wait(EC.presenceOf($('.mat-option-text')));
    expect(po.getDropdownChoices()).toEqual(['brenda - brenda1@gmail.com', 'jane - jane1@gmail.com' ]);
    po.enterText(protractor.Key.BACK_SPACE);
    expect((await po.getDropdownChoices()).length).toBe(0);
  });

  // search isn't limited by what label you've chosen, it always searches all contacts
  it('should have brenda/jane for "n" (in label three view)', async () =>  {
    po.navigate('/c62dac5b-97d8-53a5-9989-cb2f779bc5e3'); // get label three
    expect((await po.getDropdownChoices()).length).toBe(0);
    po.enterText('n');
    browser.wait(EC.presenceOf($('.mat-option-text')));
    expect(await po.getDropdownChoices()).toEqual(['brenda - brenda1@gmail.com', 'jane - jane1@gmail.com' ]);
    po.enterText(protractor.Key.BACK_SPACE);
    expect((await po.getDropdownChoices()).length).toBe(0);
  })

  it('should search for brenda/jane and open jane detail', async () => {
    po.searchAndOpen('n', 2);
    const name = await $('dk-contact-detail .name-div .name').getText();
    expect(name).toBe('jane - Jane Co');
    po.enterText(protractor.Key.BACK_SPACE);
    expect((await po.getDropdownChoices()).length).toBe(0);
  });

});


