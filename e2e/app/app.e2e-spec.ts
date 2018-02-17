import {$, $$, browser, element, by, ElementFinder, protractor} from 'protractor';
import * as _ from 'lodash';
import {CommonPO} from '../common.po';
import {LabelPO} from '../leftnav/label.po';

const EC = protractor.ExpectedConditions;
const poLabel = new LabelPO();

describe('##### main-fe App', () => {
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

  it('should redirect to root if label not found', () => {
    poLabel.labels.get(1).click();
    expect(browser.getCurrentUrl()).toBe(po.rootUrl + 'c62dac5b-97d8-53a5-9989-cb2f779bc5e2');
    browser.get('/not-a-label-id');
    expect(browser.getCurrentUrl()).toBe(po.rootUrl);
  });

});
