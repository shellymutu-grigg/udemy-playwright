/** 
 * Run in non headless mode: npx playwright test --headed 
 * Run playwright UI: npx playwright test --ui 
 * Run playwright: npx playwright test
 * Run specific playwright file: npx playwright test tests/section12Test.spec.js
 * test.only to run a single test
 * Run specific playwright file in debug mode: npx playwright test tests/section12Test.spec.js --debug 
 * Generate code: npx playwright codegen htps://www.google.com
*/

const { test, expect } = require('@playwright/test');

test('Playwright visual testing', async ({ page }) =>
{ 
    await page.goto('https://shellymutugrigg.com');
    expect(await page.screenshot()).toMatchSnapshot('homePage.png');
});