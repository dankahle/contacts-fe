import {$, $$, browser, ElementFinder, protractor} from 'protractor';

const EC = protractor.ExpectedConditions;

export class LeftnavPO {
  leftnav = $('.leftnav');
  innerHeight: number;

  resizeWindow(width) {
    browser.driver.manage().window().setSize(width, this.innerHeight);
    // browser.executeScript('window.dispatchEvent(new Event(\'resize\'));');
    // browser.executeScript('window.resizeTo(768, innerHeight);');
  }

}


