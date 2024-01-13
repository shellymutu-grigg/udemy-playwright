/** 
 * Run in non headless mode: npx playwright test --headed 
 * Run playwright UI: npx playwright test --ui 
 * Run playwright: npx playwright test
 * Run specific playwright file: npx playwright test tests/section10NetworkAbortTest.spec.js
 * test.only to run a single test
 * Run specific playwright file in debug mode: npx playwright test tests/section10NetworkAbortTest.spec.js --debug 
 * Generate code: npx playwright codegen htps://www.google.com
*/

const { test, expect, request } = require('@playwright/test');
const { apiUtils } = require('../utils/apiUtils');

const loginPayLoad = {
    userEmail: process.env.username_rahulshetty,
    userPassword: process.env.password_rahulshetty,
};

const resetPasswordPayLoad = {
    userEmail: process.env.username_rahulshetty,
    userPassword: process.env.password_rahulshetty,
    confirmPassword:process.env.password_rahulshetty
}

let token;

test.beforeAll( async () => {
    const apiContext = await request.newContext();
    const localApiUtils = new apiUtils(apiContext, loginPayLoad);
    token = await localApiUtils.getToken(resetPasswordPayLoad);
});

test('Playwright block an API call', async ({ page }) =>
{
    console.log('token', token);

    // Inject token into cookies to prevent needing to login
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, token);
    
    await page.route('**/*.{jpg, jpeg, png}', route => {
        route.abort();
    })
    await page.on('request', request => {
        console.log('request url:', request.url());
    });
    await page.on('response', response => {
        console.log('response url:', response.url());
        console.log('response status:', response.status());
    });
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator("button[routerlink='/dashboard/myorders']").click();
    await page.waitForLoadState('networkidle');
    await page.locator('tbody').waitFor();
    const rows = await page.locator("tbody tr");

    // Highjack network API call and try to access order that user does not authorisation to
    await page.route(
        'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*', 
        async route => {
            route.continue(
                {
                    url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6',
                }
            );
        }
    );
    await page.locator("button:has-text('View')").first().click();
    const message = await page.locator('.blink_me').textContent();
    console.log('Message displayed:', message)
    expect(message).toContain('You are not authorize to view this order');
});