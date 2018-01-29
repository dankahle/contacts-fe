import {$, $$, browser, ElementFinder, protractor} from 'protractor';

const EC = protractor.ExpectedConditions;

/*
* header button opens/closes
* open for gt-sm
* closed for lt-sm
* close for gt-sm if was closed before going lt-sm
 */


export class LeftnavPO {
  leftnav = $('.leftnav');


}


