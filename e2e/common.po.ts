import {$, $$, browser, element, by, ElementFinder, protractor} from 'protractor';
import * as _ from 'lodash';

export class CommonPO {
initialized: boolean;

  navigate(url) {
    browser.get(url);
    browser.wait(this.appInitialized());
  }

  refresh() {
    browser.refresh();
    browser.wait(this.appInitialized());
  }

  // throttle will return the last returned value until the function is run again
  private appInitialized() {
    return _.throttle(() => {
        return browser.executeScript('return !!window.dkAppInitialized');
      },
      500, {leading: true, trailing: false});
  }

}


