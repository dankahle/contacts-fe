import {$, $$, browser, element, by, ElementFinder, protractor} from 'protractor';
import * as fs from 'fs';

const EC = protractor.ExpectedConditions;

describe('main-fe App', () => {

  beforeAll(() => {
  });

  it('should land at root',  () => {
    browser.get('/');
    expect(browser.getCurrentUrl()).toBe('http://localhost:4201/');
  });

  it('should refresh and be at same url', () => {
    browser.refresh();
    expect(browser.getCurrentUrl()).toBe('http://localhost:4201/');
  });

  function writeScreenShot(data, filename) {
    const stream = fs.createWriteStream(filename);
    stream.write(new Buffer(data, 'base64'));
    stream.end();
  }

  xit('misc testing', async () => {
    browser.get('/');
  });



});
