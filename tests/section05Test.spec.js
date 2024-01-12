const {test, expect} = require('@playwright/test');

// Run in non headless mode: npx playwright test --headed 
// Run playwright UI: npx playwright test --ui 
// Run playwright UI: npx playwright test
// Run specific playwright file: npx playwright test tests/section04Test.spec.js 
// test.only to run a single test
// Run specific playwright file in debug mode: npx playwright test tests/section04Test.spec.js --debug
// Generate code: npx playwright codegen htps://www.google.com

test('Codegen', async ({page}) =>
{
    
});