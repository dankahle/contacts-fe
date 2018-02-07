const {SpecReporter} = require('jasmine-spec-reporter'),
  _server = require('../contacts-be/server');

let server;

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    // './e2e/slow-down-tests.ts',
    './e2e/**/*.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': ["--headless", "--disable-gpu", "--window-size=1200x1024",  "--no-sandbox"]
    }
  },
  directConnect: true,
  baseUrl: 'http://localhost:4201/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    // defaultTimeoutInterval: 30000,
    defaultTimeoutInterval: 300000,
    print: function () {
    }
  },
  onPrepare: function() {
    browser.ignoreSynchronization = false; // from angular-starter
    browser.waitForAngularEnabled(true);

    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    jasmine.getEnv().addReporter(new SpecReporter({spec: {displayStacktrace: true}}));

    console.log('onPrepare nodeenv: ', process.env.NODE_ENV);
    return _server.then((_server_) => {
      server = _server_;
      server.on('close', () => console.log('server closed'));
    });
  },
  onComplete: () => {
    server.close();
  },

  /**
   * Angular 2 configuration - from angular-starter - https://github.com/gdi2290/angular-starter
   *
   * useAllAngular2AppRoots: tells Protractor to wait for any angular2 apps on the page instead of just the one matching
   * `rootEl`
   */
  useAllAngular2AppRoots: true,

  // shut down control flow
  // SELENIUM_PROMISE_MANAGER: false,
};
