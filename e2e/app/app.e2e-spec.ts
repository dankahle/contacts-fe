import {browser} from 'protractor';

describe('main-fe App', () => {

  beforeAll(() => {
    // browser.waitForAngularEnabled(false);
  });

  it('should land at root', async () => {
    await browser.get('/')
    expect(await browser.getCurrentUrl()).toBe('http://localhost:4201/');
  });
});
