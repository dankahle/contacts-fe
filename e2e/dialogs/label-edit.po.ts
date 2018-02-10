import {$, browser, element, by, ElementFinder, protractor, $$} from 'protractor';
import {CommonPO} from '../common.po';

const EC = protractor.ExpectedConditions;

export class LabelEditPO extends CommonPO {
  dialog = $('dk-edit-label');
  submit = $('dk-edit-label button.submit');
  cancel = $('dk-edit-label button.cancel');
  input = $('dk-edit-label input');
  errorRequired = $('dk-edit-label mat-error.required');
  errorAlreadyExists = $('dk-edit-label mat-error.already-exists');
  labelAdd = $('dk-leftnav dk-leftnav-label.add-label');

  putUpAddDialog() {
    this.labelAdd.click();
    this.waitForUp();
  }

  takeDown() {
    $('body').click();
    this.waitForDown();
  }

  waitForUp() {
    browser.wait(EC.presenceOf(this.dialog));
  }

  waitForDown() {
    browser.wait(EC.stalenessOf(this.dialog));
  }

}

