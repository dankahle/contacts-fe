import { SearchPO } from './search.po';
import {browser} from 'protractor';

describe('search tests', () => {
  let po: SearchPO;

  beforeAll(() => {
    browser.waitForAngularEnabled(false);
    po = new SearchPO();
  });

  describe('root tests', () => {

    beforeAll(() => {
      po.navRoot();
    });

    fit('should clear the text', () => {
      po.enterText('lala');
      expect(po.input.getAttribute('value')).toBe('lala');
      po.clearClick();
      expect(po.input.getAttribute('value')).toBe('');
    });

    it('should set focus to input when you click on search icon', () => {
      expect(po.isInputFocused()).toBeFalsy();
      po.searchIconClick();
      expect(po.isInputFocused()).toBeTruthy();
    });

  });

});
