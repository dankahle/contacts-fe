import { SearchPO } from './search.po';
import {browser} from 'protractor';

xdescribe('search tests', () => {
  let po: SearchPO;

  beforeAll(() => {
    // browser.waitForAngularEnabled(false);
    po = new SearchPO();
  });

  describe('root tests', () => {

    beforeAll(() => {
      po.navRoot();
    });

    it('should clear the text', () => {
      console.log('before enter text');
      po.enterText('lala');
      console.log('after enter text');
      expect(po.getSearchValue()).toBe('lala');
      console.log('after getsearchvalue');
      po.clearClick();
      console.log('after click');
      expect(po.getSearchValue()).toBe('');
    });

    it('should set focus to input when you click on search icon', () => {
      expect(po.isInputFocused()).toBeFalsy();
      po.searchIconClick();
      expect(po.isInputFocused()).toBeTruthy();
    });

  });

});
