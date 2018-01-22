import { AppPage } from './app.po';
import {browser} from 'protractor';

describe('main-fe App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should land at root', () => {
    browser.get('/')
    // browser.pause();
    expect(browser.getCurrentUrl()).toBe('http://localhost:4201/');
  });
});
