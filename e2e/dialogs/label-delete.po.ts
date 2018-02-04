import {$, browser, element, by, ElementFinder, protractor, $$} from 'protractor';
import {CommonPO} from '../common.po';


export class LabelDeletePO extends CommonPO {
  dialog = $('dk-delete-label');
  submit = $('dk-delete-label button.submit');
  cancel = $('dk-delete-label button.cancel');
  radioKeep = $('dk-delete-label mat-radio-button.keep');
  radioToss = $('dk-delete-label mat-radio-button.toss');
}

