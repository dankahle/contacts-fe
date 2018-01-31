import {$, $$, browser, by, element, ElementFinder, protractor} from 'protractor';
import {CommonPO} from '../common.po';

export class ListPO extends CommonPO {
  list = $('dk-contact-list');
  contacts = $$('dk-contact-list-item');
  data: object;
  names: any;

  constructor() {
    super();

    // $$('dk-contact-list-item .name').map(ef => ef.getText())
    //   .then(arr => this.names = arr);
/*
    browser.waitForAngularEnabled(false);
    this.names = element.all(by.css('dk-contact-list-item .name')).map(function(elm, index) {
      return {
        index: index,
        text: elm.getText(),
        class: elm.getAttribute('class')
      };
    });
*/


  }

}
