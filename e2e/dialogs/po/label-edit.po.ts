import {$, browser, element, by, ElementFinder, protractor, $$} from 'protractor';
import {CommonPO} from '../../common.po';

const EC = protractor.ExpectedConditions;

export class LabelEditPO extends CommonPO {
  dialog = $('dk-edit-label');
  submit = $('dk-edit-label button.submit');
  cancel = $('dk-edit-label button.cancel');
  input = $('dk-edit-label input');
  errorRequired = $('dk-edit-label mat-error.required');
  errorAlreadyExists = $('dk-edit-label mat-error.already-exists');
  labelAdd = $('dk-leftnav dk-leftnav-label.add-label');
  qlabels = 'dk-leftnav dk-leftnav-label.user-label';
  labels = $$(this.qlabels);

  putUpAddDialog() {
    this.labelAdd.click();
    this.waitForUp();
  }

  putUpEditDialog() {
    browser.actions().mouseMove(this.labels.get(1)).perform();
    this.labels.get(1).$('.icon-edit').click(); // edit label two
    this.waitForUp();
  }

  takeDown() {
    browser.actions().mouseMove($('dk-edit-label button.submit'), {x: 0, y: 100}).perform();
    browser.actions().click().perform();
    this.waitForDown();
  }

  waitForUp() {
    browser.wait(EC.presenceOf(this.dialog));
  }

  waitForDown() {
    browser.wait(EC.stalenessOf(this.dialog));
  }

}

