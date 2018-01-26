import {browser} from 'protractor';

describe('main-fe App', () => {

  beforeAll(() => {
    // browser.waitForAngularEnabled(false);
  });

  it('should land at root',  () => {
    browser.get('/')
    expect(browser.getCurrentUrl()).toBe('http://localhost:4201/');
  });
});
