/** 
 * Run in non headless mode: npx playwright test --headed 
 * Run playwright UI: npx playwright test --ui 
 * Run playwright: npx playwright test
 * Run specific playwright file: npx playwright test tests/section11Test.spec.js
 * test.only to run a single test
 * Run specific playwright file in debug mode: npx playwright test tests/section11Test.spec.js --debug 
 * Generate code: npx playwright codegen htps://www.google.com
*/

const { test, expect } = require('@playwright/test');

test('Playwright use screenshots', async ({ page }) =>
{ 
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#displayed-text').screenshot({ path: 'before-hide-screenshot.png'});
    await page.locator('#hide-textbox').click();
    await page.screenshot({ path: 'after-hide-screenshot.png'});
    await expect(page.locator('#displayed-text')).toBeHidden();
});