import {$, $$, browser, element, by, ElementFinder, protractor} from 'protractor';
import * as _ from 'lodash';
import {CommonPO} from '../common.po';

const EC = protractor.ExpectedConditions;

describe('main-fe App', () => {
const po = new CommonPO();
const start = Date.now();

  beforeAll(() => {
    po.refreshDbAndSetPage('/');
  });

  it('should land at root',  () => {
    expect(browser.getCurrentUrl()).toBe(po.rootUrl);
  });

  it('title should be DkContacts', () => {
    expect(browser.getTitle()).toBe('DkContacts');
  });

});
