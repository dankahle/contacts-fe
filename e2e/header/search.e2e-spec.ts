import { SearchPO } from './search.po';
import {$, browser, ElementFinder} from 'protractor';

describe('search tests', () => {
  // let searchIcon: ElementFinder;
  // let input: ElementFinder;
  // let divClear: ElementFinder;
  let po: SearchPO;

  beforeAll(() => {
    po = new SearchPO();
    // browser.waitForAngularEnabled(false);
    // searchIcon = $('.auto-comp-div .prefix');
    // input = $('.auto-comp-div .input');
    // divClear = $('.auto-comp-div .suffix');
  });

  describe('root tests', () => {

    beforeAll(async () => {
      await po.navRoot();
    });

    fit('should clear the text', async () => {
      await po.enterText('lala');
      let searchVal = await po.getSearchValue();
      expect(searchVal).toBe('lala');
      await po.clearClick();
      searchVal = await po.getSearchValue();
      expect(searchVal).toBe('');
/*
      const activeElement = await browser.driver.executeScript('return document.activeElement');
      console.log('activeElement', activeElement);
      const innerWidth = await browser.driver.executeScript('return window.innerWidth');
      console.log('innerWidth', innerWidth);
*/
    });

/*
    it('should set focus to input when you click on search icon', () => {
      expect(po.isInputFocused()).toBeFalsy();
      po.searchIconClick();
      expect(po.isInputFocused()).toBeTruthy();
    });
*/

  });

});
