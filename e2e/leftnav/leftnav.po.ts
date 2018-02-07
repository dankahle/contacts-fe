import {$, $$, browser, ElementFinder, protractor} from 'protractor';
import {CommonPO} from '../common.po';

const EC = protractor.ExpectedConditions;

export class LeftnavPO extends CommonPO {
  leftnav = $('.leftnav');
  leftNavButton = $('mat-toolbar .menu');

  leftnavButtonClick() {
    const leftnavTransitionTime = 200;
    this.leftNavButton.click();
  }

}


