const {SpecReporter} = require('jasmine-spec-reporter'),
  _server = require('../contacts-be/server');

let server;

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function () {
    }
  },
  onPrepare: function() {
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
  }
};
