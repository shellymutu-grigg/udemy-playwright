/** 
 * Run in non headless mode: npx playwright test --headed 
 * Run playwright UI: npx playwright test --ui 
 * Run playwright: npx playwright test
 * Run specific playwright file: npx playwright test tests/section09Test.spec.js 
 * test.only to run a single test
 * Run specific playwright file in debug mode: npx playwright test tests/section09Test.spec.js --debug
 * Generate code: npx playwright codegen htps://www.google.com
*/

const { test, expect, request } = require('@playwright/test');
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

test.beforeAll( async () => {
    const apiContext = await request.newContext();
    const localApiUtils = new apiUtils(apiContext, loginPayLoad);
    response = await localApiUtils.createOrder(orderPayLoad, resetPasswordPayLoad);
});

test('Playwright create order using API', async ({ page }) =>
{
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