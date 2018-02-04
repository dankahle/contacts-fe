import {$, browser, element, by, ElementFinder, protractor, $$} from 'protractor';
import {CommonPO} from '../common.po';


export class LabelEditPO extends CommonPO {
  dialog = $('dk-edit-label');
  submit = $('dk-edit-label button.submit');
  cancel = $('dk-edit-label button.cancel');
  input = $('dk-edit-label input');
}

