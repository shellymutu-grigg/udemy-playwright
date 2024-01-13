/** 
 * Run in non headless mode: npx playwright test --headed 
 * Run playwright UI: npx playwright test --ui 
 * Run playwright: npx playwright test
 * Run specific playwright file: npx playwright test tests/section04Test.spec.js 
 * test.only to run a single test
 * Run specific playwright file in debug mode: npx playwright test tests/section04Test.spec.js --debug
 * Generate code: npx playwright codegen htps://www.google.com
*/

const { test, expect } = require('@playwright/test');

test('Playwright assertions', async ({ page }) =>
{
    const username = page.locator('#username');
    const password = page.locator("[type='password']");
    const dropdown = page.locator("select.form-control");
    const radioButton = page.locator('.radiotextsty').last();
    const checkbox = page.locator('#terms');
    const documentLink = page.locator("[href*='documents-request']")

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    // Print the page title
    console.log('Page title: ', await page.title());

    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    await username.fill('rahulshettyacademy');
    await password.fill('learning');
    await dropdown.selectOption('consult');

    await radioButton.click();
    await page.locator('#okayBtn').click();
    await expect(radioButton).toBeChecked();
    console.log('Last radio button is checked:', await radioButton.isChecked())

    await checkbox.click();
    await expect(checkbox).toBeChecked();
    await checkbox.uncheck();
    expect(await  checkbox.isChecked()).toBeFalsy();
    console.log('Checkbox is selected:', await checkbox.isChecked())
    // await page.pause();
    await expect(documentLink).toHaveAttribute('class', 'blinkingText')
});

test('Playwright child windows handling', async ({ browser }) =>
{
    const context = await browser.newContext();
    const landingPage = await context.newPage();
    const username = landingPage.locator('#username');
    const documentLink = landingPage.locator("[href*='documents-request']")

    await landingPage.goto('https://rahulshettyacademy.com/loginpagePractise/');

    const [reqDocsPage] = await Promise.all(
        [
            // Listen for a new page tab to load in an asynchronous manner
            context.waitForEvent('page'),
            documentLink.click(),
        ]
    )
    const headingText = await reqDocsPage.locator('.red').textContent();
    console.log('Header text on request documents page: ', headingText);

    const domain = headingText.split('@')[1].split(' ')[0];
    console.log('Domain on documents page: ', domain);

    await username.fill(domain);
    await landingPage.bringToFront();
    console.log('Username field populated with: ', await username.inputValue());
});