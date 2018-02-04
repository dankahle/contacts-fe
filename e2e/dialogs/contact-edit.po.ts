import {$, browser, element, by, ElementFinder, protractor, $$} from 'protractor';
import {CommonPO} from '../common.po';

export class ContactEditPO extends CommonPO {
  name = $('dk-contact-edit .po-name');
  submit = $('dk-contact-edit .button-submit');
  cancel = $('dk-contact-edit .button-cancel');


}

