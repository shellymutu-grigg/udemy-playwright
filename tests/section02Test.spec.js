/** 
 * Run in non headless mode: npx playwright test --headed 
 * Run playwright UI: npx playwright test --ui 
 * Run playwright: npx playwright test
 * Run specific playwright file: npx playwright test tests/section02Test.spec.js 
 * test.only to run a single test
 * Run specific playwright file in debug mode: npx playwright test tests/section02Test.spec.js --debug
 * Generate code: npx playwright codegen htps://www.google.com
*/

const { test, expect } = require('@playwright/test');

test('A page context playwright test', async ({ browser }) =>
{
    // Remember that JS is asynchronous not sequential
    // Create Chrome instance or inject page variable in fat arrow function
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.google.com/');

    // Print the page title
    console.log('Page title: ', await page.title());

    await expect(page).toHaveTitle('Google');
});

test('Injected page variable with core playwright setup', async ({ page }) =>
{
    const username = page.locator('#username');
    const password = page.locator("[type='password']");
    const signInBtn = page.locator('#signInBtn')
    const cardTitles = page.locator(".card-body a");
    // Remember that JS is asynchronous not sequential
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    // Print the page title
    console.log('Page title: ', await page.title());

    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    await username.fill('rahulshetty');
    await password.fill('learning');

    await Promise.all(
        [
            page.waitForURL('**/loginpagePractise/'),
            await signInBtn.click(),
        ]
    )

    // Print out error message text
    console.log('Error text:', await page.locator("[style*='block']").textContent());

    await expect(page.locator("[style*='block']")).toContainText('Incorrect username');

    await username.fill('rahulshettyacademy');
    await password.fill('learning');
    await signInBtn.click();

    // Print the text of the second card title
    console.log('Card title text ', await cardTitles.nth(1).textContent());

    // allTextContent() method will not wait for element load like at L#49
    const allCardTitles = await cardTitles.allTextContents();
    console.log('All card titles text ', allCardTitles);
});