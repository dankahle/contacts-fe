import { SearchPO } from './search.po';
import {$, browser, ElementFinder} from 'protractor';

describe('search tests', () => {
  let po: SearchPO;

  beforeAll(() => {
    // browser.waitForAngularEnabled(false);
    po = new SearchPO();
  });

  describe('root tests', () => {

    beforeAll(async () => {
      await po.navRoot();
    });

    async function getSearchValue() {
      console.log('getSearchValue start');
      // const val = await po.input.getAttribute('value');
      // console.log('getSearchValue', val);
      const val =  await po.input.getAttribute('value');
      return val;
    }

    fit('should clear the text', async () => {
      await po.enterText('lala');
      expect(await po.getSearchValue()).toBe('lala');
/*
      await browser.actions()
        .mouseMove(po.searchIcon)
        .click()
        .perform();
*/
      await po.clearClick();
      expect(await po.getSearchValue()).toBe('');
    });

    it('should set focus to input when you click on search icon', async () => {
      await $('body').click();
      expect(await po.isInputFocused()).toBeFalsy();
      await po.searchIconClick();
      expect(await po.isInputFocused()).toBeTruthy();
    });

  });

});


