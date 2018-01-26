import { SearchPO } from './search.po';
import {$, browser, ElementFinder} from 'protractor';

describe('search tests', () => {
  let po: SearchPO;

  beforeAll(() => {
    // browser.waitForAngularEnabled(false);
    po = new SearchPO();
  });

  describe('root tests', () => {

    beforeAll( () => {
      po.navRoot();
    });

    it('should clear the text', () => {
      po.enterText('lala');
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

  });

});


