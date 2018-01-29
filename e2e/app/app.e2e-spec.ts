import {$, $$, browser, element, by, ElementFinder, protractor} from 'protractor';
import * as fs from 'fs';

const EC = protractor.ExpectedConditions;

describe('main-fe App', () => {

  beforeAll(() => {
  });

  xit('explore', () => {
    browser.explore();
  });

  it('should land at root',  () => {
    browser.get('/');
    expect(browser.getCurrentUrl()).toBe('http://localhost:4201/');
  });

});
