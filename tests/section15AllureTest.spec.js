/** 
 * Run in non headless mode: npx playwright test --headed 
 * Run playwright UI: npx playwright test --ui 
 * Run playwright: npx playwright test
 * Run specific playwright file: npx playwright test tests/section14CWebTagTest.spec.js 
 * test.only to run a single test
 * Run specific playwright file in debug mode: npx playwright test tests/section14WebTagTest.spec.js --debug
 * Generate code: npx playwright codegen htps://www.google.com
 * Set workers: npx playwright test tests/section14WebTagTest.spec.js --config playwright.config-other.js --project=chrome
 * Run tests using tags: npx playwright test --grep @Web or @API
 * Generate allure report:
 *  - npm i -D @playwright/test allure-playwright 
 *  - brew install allure
 *  - npx playwright test --grep @API --reporter=line,allure-playwright
 *  - allure generate 
 *  - allure open
 * 
 * Run script: npm run webTests
*/

const { test, expect, request } = require('@playwright/test');

test.describe.configure(
    {
        mode: 'parallel', // serial if have dependant subsequent tests
    }
);

const { apiUtils } = require('../utils/apiUtils');

const loginPayLoad = {
    userEmail: process.env.username_rahulshetty,
    userPassword: process.env.password_rahulshetty,
};

const orderPayLoad = {
    orders: [
        {
            country: "New Zealand",
            productOrderedId: "6581ca979fd99c85e8ee7faf"
        }
    ]
}

const resetPasswordPayLoad = {
    userEmail: process.env.username_rahulshetty,
    userPassword: process.env.password_rahulshetty,
    confirmPassword:process.env.password_rahulshetty
}

let response;

test('@API Playwright create order using API', async ({ page }) =>
{
    const apiContext = await request.newContext();
    const localApiUtils = new apiUtils(apiContext, loginPayLoad);
    response = await localApiUtils.createOrder(orderPayLoad, resetPasswordPayLoad);
    console.log('response.token', response.token);
    console.log('response.orderId', response.orderId);

    // Inject token into cookies to prevent needing to login
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, response.token);
    
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator("button[routerlink='/dashboard/myorders']").click();
    await page.waitForLoadState('networkidle');
    await page.locator('tbody').waitFor();
    const rows = await page.locator("tbody tr");
    const rowCount = await rows.count();
    for(let i = 0; i < rowCount; i++){
        const rowOrderId = await rows.nth(i).locator('th').textContent();
        if(response.orderId.includes(rowOrderId)){
            await rows.nth(i).locator('button').first().click();
            break;
        }
    }
        
    const orderIdDetails = await page.locator('.col-text').textContent();
    await expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
});

test('@Web Playwright workers', async ({ page }) =>
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

test('@Web Playwright child windows handling', async ({ browser }) =>
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