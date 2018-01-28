import { SearchPO } from './search.po';
import {$, browser, ElementFinder, protractor} from 'protractor';

describe('search tests', () => {
  let po: SearchPO;

  beforeAll(() => {
    po = new SearchPO();
  });

  describe('root tests', () => {

    beforeAll( () => {
      po.navRoot();
    });

    it('should clear the text', async () => {
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
      expect(po.isInputFocused()).toBeFalsy();
      po.searchIconClick();
      expect(po.isInputFocused()).toBeTruthy();
    });

    it('should set focus to input when you click on search icon - switchTo().activeElement()',  () => {
      expect(po.input.equals(browser.driver.switchTo().activeElement())).toBeFalsy();
      po.searchIconClick();
      expect(po.input.equals(browser.driver.switchTo().activeElement())).toBeTruthy();
    });

    fit('should search for brenda/jane and open jane detail', async () => {
      po.searchAndOpen(2);
      const name = await $('dk-contact-detail .name-div .name').getText();
      expect(name).toBe('jane - Jane Co');
    });

  });

});


