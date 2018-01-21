import { AppPage } from './app.po';
import {browser} from 'protractor';

describe('main-fe App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    browser.get('/')
    expect(browser.getCurrentUrl()).toBe('/register');
  });
});
