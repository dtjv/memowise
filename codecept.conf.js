require('dotenv-safe').load();

const { resolve } = require('path');

const WebDriverIO = {};
WebDriverIO.url = 'http://localhost:3000';
WebDriverIO.browser = 'chrome';

if (process.env.TRAVIS) {
  const caps = {};

  caps.browserName = 'chrome';
  caps.version = '55.0';
  caps['tunnel-identifier'] = process.env.TRAVIS_JOB_NUMBER;
  caps.name = 'acceptance';
  caps.build = process.env.TRAVIS_BUILD_NUMBER;

  WebDriverIO.host = 'ondemand.saucelabs.com';
  WebDriverIO.port = 80;
  WebDriverIO.user = process.env.SAUCE_USERNAME;
  WebDriverIO.key = process.env.SAUCE_ACCESS_KEY;
  WebDriverIO.desiredCapabilities = caps;
}

const BASE_TEST_DIR = './test/e2e';

exports.config = {
  tests: resolve(BASE_TEST_DIR, 'tests/*AT.js'),
  timeout: 10000,
  output: resolve(BASE_TEST_DIR, 'output'),
  helpers: {
    WebDriverIO,
  },
  include: {
    I: resolve(BASE_TEST_DIR, './steps/Custom.js'),
    studyStep: resolve(BASE_TEST_DIR, './steps/Study.js'),
    dashboardPage: resolve(BASE_TEST_DIR, './pages/Dashboard.js'),
    flashcardFragment: resolve(BASE_TEST_DIR, './fragments/Flashcard.js'),
  },
  bootstrap: resolve(BASE_TEST_DIR, 'hooks/bootstrap.js'),
  teardown: resolve(BASE_TEST_DIR, 'hooks/bootstrap.js'),
  mocha: {},
  name: 'webdriverio',
};
