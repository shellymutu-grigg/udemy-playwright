// @ts-check
const { devices } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  testDir: './tests',
  timeout: 30 * 1000,
  testMatch: '*/*.spec.js',
  expect: {
    timeout: 5000
  },
  reporter: 'html',
  use: {
    browserName : 'chromium',
    headless: false,
    screenshot: 'on', // 'off', 'on', 'only-on-failure'
    trace: 'on', // 'off', 'on', 'retain-on-failure'
  },
};
module.exports = config;
