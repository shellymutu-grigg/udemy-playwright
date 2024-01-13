/** 
 * Run in non headless mode: npx playwright test --headed 
 * Run playwright UI: npx playwright test --ui 
 * Run playwright: npx playwright test
 * Run specific playwright file: npx playwright test tests/section03Test.spec.js 
 * test.only to run a single test
 * Run specific playwright file in debug mode: npx playwright test tests/section03Test.spec.js --debug
 * Generate code: npx playwright codegen htps://www.google.com
*/

const { test, expect } = require('@playwright/test');

test('Login and wait for network to be idle', async ({ page }) =>
{
    const username = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const loginBtn = page.locator('#login')
    const cardTitles = page.locator(".card-body b");

    // Remember that JS is asynchronous not sequential
    await page.goto('https://rahulshettyacademy.com/client');

    // Print the page title
    console.log('Page title: ', await page.title());

    await expect(page).toHaveTitle("Let's Shop");
    await username.fill(process.env.username_rahulshetty);
    await password.fill(process.env.password_rahulshetty);
    await loginBtn.click();

    // allTextContent() method will not wait for element load like at L#49
    await page.waitForLoadState('networkidle');
    // await cardTitles.first().waitFor();
    const allCardTitles = await cardTitles.allTextContents();
    console.log('All card titles text ', allCardTitles);
});