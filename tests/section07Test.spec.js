/** 
 * Run in non headless mode: npx playwright test --headed 
 * Run playwright UI: npx playwright test --ui 
 * Run playwright: npx playwright test
 * Run specific playwright file: npx playwright test tests/section07Test.spec.js 
 * test.only to run a single test
 * Run specific playwright file in debug mode: npx playwright test tests/section07Test.spec.js --debug
 * Generate code: npx playwright codegen htps://www.google.com
*/

const {test, expect} = require('@playwright/test');

test('Playwright specific locators', async ({page}) =>
{
    await page.goto('https://rahulshettyacademy.com/angularpractice');

    // Use label to find local checkbox
    await page.getByLabel('Check me out if you Love IceCreams!').click();
    await page.getByLabel('Employed').check();
    await page.getByLabel('Gender').selectOption('Female');
});
