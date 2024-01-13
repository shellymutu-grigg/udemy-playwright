/** 
 * Run in non headless mode: npx playwright test --headed 
 * Run playwright UI: npx playwright test --ui 
 * Run playwright: npx playwright test
 * Run specific playwright file: npx playwright test tests/section05Test.spec.js 
 * test.only to run a single test
 * Run specific playwright file in debug mode: npx playwright test tests/section05Test.spec.js --debug
 * Generate code: npx playwright codegen htps://www.google.com
*/

const { test } = require('@playwright/test');

test('Playwright codegen', async ({ page }) =>
{
    
});