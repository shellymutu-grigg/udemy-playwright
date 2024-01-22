/** 
 * Run in non headless mode: npx playwright test --headed 
 * Run playwright UI: npx playwright test --ui 
 * Run playwright: npx playwright test
 * Run specific playwright file: npx playwright test tests/section10NetworkTest.spec.js 
 * test.only to run a single test
 * Run specific playwright file in debug mode: npx playwright test tests/section10NetworkTest.spec.js --debug
 * Generate code: npx playwright codegen htps://www.google.com
*/

const { test, request } = require('@playwright/test');
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

const emptyOrdersPayload = {
    data: [],
    message: "No Orders"
}

let response;

test.beforeAll( async () => {
    const apiContext = await request.newContext();
    const localApiUtils = new apiUtils(apiContext, loginPayLoad);
    response = await localApiUtils.createOrder(orderPayLoad, resetPasswordPayLoad);
});

test('Playwright mock an API response to force UI to display no orders', async ({ page }) =>
{
    console.log('response.token', response.token);
    console.log('response.orderId', response.orderId);

    // Inject token into cookies to prevent needing to login
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, response.token);
    
    await page.goto('https://rahulshettyacademy.com/client');

    // Highjack network API call and mock response
    await page.route(
        'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/648986df7244490f95628d27', 
        async route => {
            // Retrieve real response from API
            const response = await page.request.fetch(route.request());

            // Overwrite response by mocking body variable
            let body = JSON.stringify(emptyOrdersPayload);
            route.fulfill(
                {
                    response, 
                    body
                }
            );
        }
    );
    await page.locator("button[routerlink='/dashboard/myorders']").click();
    await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*');
    await page.waitForLoadState('networkidle');
    const message = await page.locator('.mt-4').textContent();
    console.log('Message displayed:', message);
});