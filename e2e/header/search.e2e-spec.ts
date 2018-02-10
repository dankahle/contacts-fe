import { SearchPO } from './search.po';
import {$, $$, browser, ElementFinder, protractor} from 'protractor';
import {LabelPO} from '../leftnav/label.po';
import {ContactDetailPO} from '../dialogs/po/contact-detail.po';

const EC = protractor.ExpectedConditions;

describe('##### search tests', () => {
  const po = new SearchPO();
  const poLabel = new LabelPO();
  const poContactDetail = new ContactDetailPO();

  beforeAll(() => {
    po.refreshDbAndSetPage('/');
  });

  it('should show clear icon when input has text', () => {
    expect(po.divClear.isDisplayed()).toBe(false);
    po.clearAndEnterText('x');
    expect(po.divClear.isDisplayed()).toBe(true);
    po.enterText(protractor.Key.BACK_SPACE);
    expect(po.divClear.isDisplayed()).toBe(false);
  });

  it('should clear the text', async () => {
    expect(po.divClear.isDisplayed()).toBe(false);
    po.clearAndEnterText('lala');
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

  it('should have Brenda/jane/Martha Co for "a"', async () =>  {
    expect((await po.getDropdownChoices()).length).toBe(0);
    po.clearAndEnterText('a');
    expect(po.getDropdownChoices()).toEqual(['Brenda - brenda1@gmail.com', 'jane - jane1@gmail.com', 'Martha Co - martha1@gmail.com']);
    po.enterText(protractor.Key.BACK_SPACE);
    expect((await po.getDropdownChoices()).length).toBe(0);
  });

  it('should only have jane for "j", then nothing for backspace', async () =>  {
    expect((await po.getDropdownChoices()).length).toBe(0);
    po.clearAndEnterText('j');
    expect(po.getDropdownChoices()).toEqual(['jane - jane1@gmail.com' ]);
    po.enterText(protractor.Key.BACK_SPACE);
    expect((await po.getDropdownChoices()).length).toBe(0);
  })

  it('should have Brenda/jane for "n"', async () =>  {
    expect((await po.getDropdownChoices()).length).toBe(0);
    po.clearAndEnterText('n');
    expect(po.getDropdownChoices()).toEqual(['Brenda - brenda1@gmail.com', 'jane - jane1@gmail.com' ]);
    po.enterText(protractor.Key.BACK_SPACE);
    expect((await po.getDropdownChoices()).length).toBe(0);
  });

  // search isn't limited by what label you've chosen, it always searches all contacts
  it('should have Brenda/jane for "n" (in label three view)', async () =>  {
    browser.get('/c62dac5b-97d8-53a5-9989-cb2f779bc5e3'); // get label three
    expect((await po.getDropdownChoices()).length).toBe(0);
    po.clearAndEnterText('n');
    expect(await po.getDropdownChoices()).toEqual(['Brenda - brenda1@gmail.com', 'jane - jane1@gmail.com' ]);
    po.enterText(protractor.Key.BACK_SPACE);
    expect((await po.getDropdownChoices()).length).toBe(0);
  })

  it('should search for Brenda/jane and open jane detail', async () => {
    po.searchAndOpen('n', 2);
    poContactDetail.waitForUp();
    expect(poContactDetail.name.getText()).toBe('jane - jane co');
    poContactDetail.takeDownClose();
    po.enterText(protractor.Key.BACK_SPACE);
    expect((await po.getDropdownChoices()).length).toBe(0);
  });

});


