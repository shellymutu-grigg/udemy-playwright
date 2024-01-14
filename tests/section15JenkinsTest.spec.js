/** 
 * Run in non headless mode: npx playwright test --headed 
 * Run playwright UI: npx playwright test --ui 
 * Run playwright: npx playwright test
 * Run specific playwright file: npx playwright test tests/section14CWebTagTest.spec.js 
 * test.only to run a single test
 * Run specific playwright file in debug mode: npx playwright test tests/section14WebTagTest.spec.js --debug
 * Generate code: npx playwright codegen htps://www.google.com
 * Set workers: npx playwright test tests/section14WebTagTest.spec.js --config playwright.config-other.js --project=chrome
 * Run tests using tags: npx playwright test --grep @Web or @API
 * Install jenkins (Mac):
 *   Install the latest LTS version: brew install jenkins-lts
 *   Start the Jenkins service: brew services start jenkins-lts
 *   Navigate to: http://localhost:8080 - complete setup steps
 *   Change config to http://localhost:9090 
 *   /Users/shellymutu-grigg/.jenkins/secrets/initialAdminPassword
 *   Restart the Jenkins service: brew services restart jenkins-lts
 *   Update the Jenkins version: brew upgrade jenkins-lts
*/

const { test } = require('@playwright/test');

test.describe.configure(
    {
        mode: 'parallel', // serial if have dependant subsequent tests
    }
);


test('Setup Jenkins 01', async ({ page }) =>
{

});

test('Setup Jenkins 02', async ({ page }) =>
{

});

test('Setup Jenkins 03', async ({ browser }) =>
{
    
});