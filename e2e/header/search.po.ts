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
    return await $('.searchInput:focus').isPresent();
  }

  async getSearchValue() {
    console.log('getSearchValue start');
    const val = await this.input.getAttribute('value');
    console.log('getSearchValue', val);
    return val;
  }

}



