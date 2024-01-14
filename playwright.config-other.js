// @ts-check
const { devices } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
let config = {
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  reporter: 'html',
  use: {
    // browserName: 'chromium'
    headless: false,
    screenshot: 'on', // 'off', 'on', 'only-on-failure'
    trace: 'on', // 'off', 'on', 'retain-on-failure'
    ignoreHttpsErrors: true,
    permissions: ['geolocation'],
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chrome',
      use: { 
        ...devices['Desktop Chrome'], 
        viewport: { 
          width: 1020, 
          height: 1020 
        } 
      },
    },

     {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'safari',
      use: { 
        ...devices['Desktop Safari'],
        viewport: { 
          width: 1520, 
          height: 1020 
        }  
      },
    },
    {
      name: 'iPhone11',
      use: { 
        ...devices['iPhone 11'],
        browserName: 'chromium',
      },
    },
  ],
};
module.exports = config;
