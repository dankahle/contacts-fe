import { SearchPO } from './search.po';
import {$, browser, ElementFinder} from 'protractor';

describe('search tests', () => {
  let searchIcon: ElementFinder;
  let input: ElementFinder;
  let divClear: ElementFinder;

  beforeAll(() => {
    // browser.waitForAngularEnabled(false);
    searchIcon = $('.auto-comp-div .prefix');
    input = $('.auto-comp-div .input');
    divClear = $('.auto-comp-div .suffix');
  });

  describe('root tests', () => {

    beforeAll(() => {
      browser.get('/');
    });

    fit('should clear the text', async () => {
      await input.sendKeys('lala');
      let searchVal = await input.getAttribute('value');
      expect(searchVal).toBe('lala');
      await divClear.click();
      searchVal = await input.getAttribute('value');
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
