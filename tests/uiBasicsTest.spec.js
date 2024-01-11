const {test, expect} = require('@playwright/test');

// Run in headed mode: npx playwright test --headed 

test('Page context playwright test', async ({browser}) =>
{
    // Remember that JS is asynchronous not sequential
    // Create Chrome instance or inject page variable in fat arrow function
    let context = await browser.newContext();
    let page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
});

// test.only to run a single test
test('Injected page variable playwright test', async ({browser, page}) =>
{
    // Remember that JS is asynchronous not sequential
    await page.goto('https://www.google.com/');

    // Print the page title
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
    await page.locator('#username').fill('rahulshetty');
    await page.locator("[type='password']").fill('learning');
    await page.locator('#signInBtn').click();
});