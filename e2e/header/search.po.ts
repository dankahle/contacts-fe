import {$, browser, element, by, ElementFinder} from 'protractor';


export class SearchPO {
  divClear: ElementFinder;
  input: ElementFinder;
  searchIcon: ElementFinder;

  constructor() {
    this.searchIcon = $('.auto-comp-div .prefix');
    this.input = $('.auto-comp-div .input');
    this.divClear = $('.auto-comp-div .suffix');
    // debugger;
  }

  async navRoot() {
    await browser.get('/');
  }

  async enterText(text) {
    await this.input.sendKeys(text);
  }

  async clearClick() {
    await this.divClear.click();
  }

  async searchIconClick() {
    await this.searchIcon.click();
  }

  async isInputFocused() {
    const document: any = await browser.executeScript('return document;');
    return this.input.id && this.input.id === document.activeElement.id;
  }

  async getSearchValue() {
    const val = await this.input.getAttribute('value');
    return val;
  }

}



