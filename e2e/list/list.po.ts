import {$, $$, browser, by, element, ElementFinder, protractor} from 'protractor';
import {CommonPO} from '../common.po';

export class ListPO extends CommonPO {
  list = $('dk-contact-list');
  contacts = $$('dk-contact-list-item');
  data: object;
  names = $$('dk-contact-list-item .name');

  getNames() {
    return this.names.map(ef => ef.getText());
  }

}
