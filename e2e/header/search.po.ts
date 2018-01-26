import {$, browser, element, by, ElementFinder} from 'protractor';


export class SearchPO {
  searchIcon: ElementFinder;
  input: ElementFinder;
  divClear: ElementFinder;

  constructor() {
    this.searchIcon = $('.auto-comp-div .prefix');
    this.input = $('.auto-comp-div .searchInput');
    this.divClear = $('.auto-comp-div .suffix');
    // debugger;
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
    return $('.searchInput:focus').isPresent();
  }

  getSearchValue() {
    const val = this.input.getAttribute('value');
    return val;
  }

}



