const {test, expect} = require('@playwright/test');

// Run in non headless mode: npx playwright test --headed 
// Run playwright UI: npx playwright test --ui 
// Run playwright UI: npx playwright test

test('A page context playwright test', async ({browser}) =>
{
    // Remember that JS is asynchronous not sequential
    // Create Chrome instance or inject page variable in fat arrow function
    let context = await browser.newContext();
    let page = await context.newPage();
    await page.goto('https://www.google.com/');

    // Print the page title
    await console.log('Page title: ', await page.title());

    await expect(page).toHaveTitle('Google');
});

// test.only to run a single test
test('Injected page variable playwright test', async ({browser, page}) =>
{
    // Remember that JS is asynchronous not sequential
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    // Print the page title
    await console.log('Page title: ', await page.title());

    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    await page.locator('#username').fill('rahulshetty');
    await page.locator("[type='password']").fill('learning');
    await page.locator('#signInBtn').click();

    // Print out error message text
    console.log('Error text:', await page.locator("[style*='block']").textContent());

    await expect(page.locator("[style*='block']")).toContainText('Incorrect username');
});