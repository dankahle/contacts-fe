import {$, browser, element, by, ElementFinder, protractor, $$} from 'protractor';
import {CommonPO} from '../common.po';

const EC = protractor.ExpectedConditions;

export class SearchPO extends CommonPO {
  searchIcon = $('.auto-comp-div .prefix');
  input = $('.auto-comp-div .searchInput');
  divClear = $('.auto-comp-div .suffix');

  async getDropdownChoices() {
    const arr = await $$('.mat-option-text').getText();
    return arr;
  }

  enterText(text, clear?) {
    this.input.sendKeys(text);
  }

  clearAndEnterText(text, clear?) {
    this.input.clear();
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

  searchAndOpen(text, numDownArrows) {
    this.enterText(text);
    while (numDownArrows >= 1) {
      this.input.sendKeys(protractor.Key.ARROW_DOWN);
      numDownArrows--;
    }
    this.input.sendKeys(protractor.Key.ENTER);
  }

}



