import {$, browser, ElementFinder} from 'protractor';


export class SearchPO {
  divClear: ElementFinder;
  input: ElementFinder;
  searchIcon: ElementFinder;

  constructor() {
    this.divClear = $('.auto-comp-div .suffix');
    this.input = $('.auto-comp-div .input');
    this.searchIcon = $('');
  }

  navRoot() {
    browser.get('/');
  }

  enterText(text) {
    this.input.sendKeys(text);
  }

  clearClick() {
    this.divClear.click();
  }

  searchIconClick() {
    this.searchIcon.click();
  }

  isInputFocused() {
    const document: any = browser.executeScript('return document');
    return this.input.equals(document.activeElement);
  }

}



