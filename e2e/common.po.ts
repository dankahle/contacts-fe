import {$, $$, browser, element, by, ElementFinder, protractor} from 'protractor';
import * as _ from 'lodash';

export class CommonPO {
initialized: boolean;

  // don't need this, this is handled by browser.waitForAngularEnabled=true and browser.ignoreSynchronization=false (in config.onPrepare)
  // you had turned off waitForAngularEnabled to get $$().map working for getNames() function,
  // but it's all working now with these 2 settings above
/*
  navigate(url) {
    browser.get(url);
    // browser.wait(this.contactListInitialized());
  }
*/

  // don't need this, this is handled by browser.waitForAngularEnabled=true and browser.ignoreSynchronization=false (in config.onPrepare)
  // you had turned off waitForAngularEnabled to get $$().map working for getNames() function,
  // but it's all working now with these 2 settings above
/*
  refresh() {
    browser.refresh();
    // browser.wait(this.contactListInitialized());
  }
*/

  // throttle will return the last returned value until the function is run again
  private appInitialized() {
    return _.throttle(() => {
        return browser.executeScript('return !!window.dkAppInitialized');
      },
      500, {leading: true, trailing: false});
  }

  private contactListInitialized() {
    return _.throttle(() => {
        return browser.executeScript('return !!window.dkContactListInitialized');
      },
      500, {leading: true, trailing: false});
  }

  hasClass(elem, cls) {
    return elem.getAttribute('class').then(function (classes) {
      return classes.split(' ').indexOf(cls) !== -1;
    });
  }

}


