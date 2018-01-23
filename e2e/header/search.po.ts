import {$, browser, ElementFinder} from 'protractor';


export class SearchPO {
  divClear: ElementFinder;
  input: ElementFinder;
  searchIcon: ElementFinder;

  constructor() {
    this.divClear = $('.auto-comp-div .suffix');
    this.input = $('.auto-comp-div .input');
    this.searchIcon = $('.auto-comp-div .prefix');
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
    return browser.executeScript('return document')
      .then((document: any) => {
        return this.input.equals(document.activeElement);
      });
  }

}



