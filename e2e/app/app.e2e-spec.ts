import { AppPO } from './app.po';
import {browser} from 'protractor';

describe('main-fe App', () => {
  let po: AppPO;

  beforeAll(() => {
    // browser.waitForAngularEnabled(false);
    po = new AppPO();
  });

  it('should land at root', () => {
    browser.get('/')
    // browser.pause();
    expect(browser.getCurrentUrl()).toBe('http://localhost:4201/');
  });
});
