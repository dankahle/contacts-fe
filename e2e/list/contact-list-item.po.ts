import {$, $$, browser, by, element, ElementFinder, protractor} from 'protractor';
import {CommonPO} from '../common.po';

export class ContactListItemPO extends CommonPO {
iconEdit = $('dk-contact-list-item .icon-edit');
iconMoreActions = $('dk-contact-list-item .icon-more-actions');



}
