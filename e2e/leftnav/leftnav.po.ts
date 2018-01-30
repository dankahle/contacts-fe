import {$, $$, browser, ElementFinder, protractor} from 'protractor';

const EC = protractor.ExpectedConditions;

export class LeftnavPO {
  leftnav = $('.leftnav');
  leftNavButton = $('mat-toolbar .menu');
    innerHeight: number;

  resizeWindow(width) {
    browser.driver.manage().window().setSize(width, this.innerHeight);
  }

  leftnavButtonClick() {
    const leftnavTransitionTime = 200;
    this.leftNavButton.click();
    browser.sleep(leftnavTransitionTime + 200);
  }

}


