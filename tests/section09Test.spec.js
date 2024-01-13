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

const payLoad = {
    userEmail: process.env.username_rahulshetty,
    userPassword: process.env.password_rahulshetty,
};
let token;

test.beforeAll( async () => {
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', 
    {
        data: payLoad,
    });
    await expect(loginResponse.ok()).toBeTruthy();
    const responseJson = await loginResponse.json();
    token = responseJson.token;
    console.log('token:', token)
});

test('Playwright API testing', async ({ page }) =>
{
    // Inject token into cookies to prevent needing to login
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, token)
    await page.goto('https://rahulshettyacademy.com/client');
    
});