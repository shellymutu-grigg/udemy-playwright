/** 
 * Run in non headless mode: npx playwright test --headed 
 * Run playwright UI: npx playwright test --ui 
 * Run playwright: npx playwright test
 * Run specific playwright file: npx playwright test tests/section10SessionTest.spec.js 
 * test.only to run a single test
 * Run specific playwright file in debug mode: npx playwright test tests/section10SessionTest.spec.js --debug
 * Generate code: npx playwright codegen htps://www.google.com
 * Debug test: CMD + SHIFT + P > Debug: Debug npm Script 
 * open trace.zip in https://trace.playwright.dev to track all data
*/

const { test, expect, request } = require('@playwright/test');
let webContext;
let response;

test.beforeAll( async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const email = process.env.username_rahulshetty;
    const password = process.env.password_rahulshetty;
    const usernameField = page.locator('#userEmail');
    const passwordField = page.locator('#userPassword');
    const loginBtn = page.locator('#login')

    await page.goto('https://rahulshettyacademy.com/client');
    console.log('Page title: ', await page.title());
    await expect(page).toHaveTitle("Let's Shop");
    await usernameField.fill(email);
    await passwordField.fill(password);
    await loginBtn.click();
    await page.waitForLoadState('networkidle');
    await context.storageState({ path: 'state.json' });
    webContext = await browser.newContext({ storageState: 'state.json' });
});

test('Playwright using session stroage', async () =>
{
    const productName = 'ZARA COAT 3';
    const page = await webContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client');
    const products = page.locator(".card-body");
    const cardTitles = page.locator(".card-body b");
    
    const allCardTitles = await cardTitles.allTextContents();
    console.log('All product titles:', allCardTitles);

    await page.locator("button[routerlink='/dashboard/myorders']").click();
    await page.waitForLoadState('networkidle');
    await page.locator('tbody').waitFor();
    const rows = await page.locator("tbody tr");
    const rowCount = await rows.count();
    for(let i = 0; i < rowCount; i++){
        const rowOrderId = await rows.nth(i).locator('th').textContent();
        console.log('orderId for row '+ i +':', rowOrderId);
    }
});