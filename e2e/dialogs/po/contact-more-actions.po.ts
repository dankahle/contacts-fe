import {$, browser, element, by, ElementFinder, protractor, $$} from 'protractor';
import {CommonPO} from '../../common.po';

const EC = protractor.ExpectedConditions;

export class ContactMoreActionsPO extends CommonPO {
  menu = $('.mat-menu-panel');
  itemRemoveFromLabel = $('.mat-menu-panel .item-remove-from-label');
  itemDelete = $('.mat-menu-panel .item-delete');
  itemLabels = $$('.mat-menu-panel .item-label');

  waitForUp() {
    browser.wait(EC.presenceOf(this.menu));
  }

  waitForDown() {
    browser.wait(EC.stalenessOf(this.menu));
  }

  takeDown() {
    $('body').click();
    this.waitForDown();
  }

}

