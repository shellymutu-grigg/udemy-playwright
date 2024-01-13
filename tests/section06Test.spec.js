/** 
 * Run in non headless mode: npx playwright test --headed 
 * Run playwright UI: npx playwright test --ui 
 * Run playwright: npx playwright test
 * Run specific playwright file: npx playwright test tests/section06Test.spec.js 
 * test.only to run a single test
 * Run specific playwright file in debug mode: npx playwright test tests/section06Test.spec.js --debug
 * Generate code: npx playwright codegen htps://www.google.com
*/

const {test, expect} = require('@playwright/test');

import { resetPassword } from '../functions/resetPassword';

test('Playwright script to dynamically find product', async ({page}) =>
{
    const email = process.env.username_rahulshetty;
    const password = process.env.password_rahulshetty;
    const usernameField = page.locator('#userEmail');
    const passwordField = page.locator('#userPassword');
    const loginBtn = page.locator('#login')
    const cardTitles = page.locator(".card-body b");
    const products = page.locator(".card-body");
    const forgotPasswordLink = page.locator('.forgot-password-link');
    const emailField = page.locator("[type='email']");
    const resetPasswordField = page.locator('#userPassword');
    const confirmPasswordField = page.locator('#confirmPassword');
    const submitButton = page.locator("[type='submit']");
    const productName = 'ZARA COAT 3';

    await page.goto('https://rahulshettyacademy.com/client');

    // Print the page title
    console.log('Page title: ', await page.title());

    await expect(page).toHaveTitle("Let's Shop");
    await usernameField.fill(email);
    await passwordField.fill(password);
    await loginBtn.click();
    await page.waitForLoadState('networkidle');
    const isLoggedIn = await page.locator("button:has-text('HOME')").isVisible();
    console.log('isLoggedIn:', isLoggedIn);

    if(!isLoggedIn){
        await resetPassword(
            forgotPasswordLink, 
            emailField, 
            resetPasswordField, 
            confirmPasswordField, 
            submitButton, 
            email, 
            password, 
            usernameField, 
            passwordField, 
            loginBtn);
    }

    // allTextContent() method will not wait for element load like at L#49
    await page.waitForLoadState('networkidle');
    const allCardTitles = await cardTitles.allTextContents();
    console.log('All product titles:', allCardTitles);

    const count = await products.count();
    for(let i = 0; i < count; i++){
        if(await products.nth(i).locator('b').textContent() === productName){
            // Add the product to cart
            await products.nth(i).locator('text= Add to Cart').click();
            break;
        }
    }
    await page.locator("[routerlink='/dashboard/cart']").click();
    await page.locator('div li').first().waitFor();

    // isVisible() does not implement the auto wait
    const isPresent = await page.locator("h3:has-text('" + productName + "')").isVisible();
    expect(isPresent).toBeTruthy();
    await page.locator('text=Checkout').click();
    await page.locator("[placeholder='Select Country']").pressSequentially('new z');
    const dropdownOptions = await page.locator('.ta-results');
    await dropdownOptions.waitFor();
    const optionsCount = await dropdownOptions.locator('button').count();
    for(let i = 0; i < optionsCount; i++){
        const text = await dropdownOptions.locator('button').nth(i).textContent();
        if(text.trim() === 'New Zealand'){
            await dropdownOptions.locator('button').nth(i).click();
            break;
        }
    }
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator('.action__submit').click();
    await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');
    const orderId = (await page.locator('.em-spacer-1 .ng-star-inserted').textContent()).split(' ')[2];
    console.log('Order ID:', orderId);
    await page.locator("button[routerlink='/dashboard/myorders']").click();
    await page.waitForLoadState('networkidle');
    await page.locator('tbody').waitFor();
    const rows = await page.locator("tbody tr");
    const rowCount = await rows.count();
    for(let i = 0; i < rowCount; i++){
        const rowOrderId = await rows.nth(i).locator('th').textContent();
        if(orderId.includes(rowOrderId)){
            await rows.nth(i).locator('button').first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator('.col-text').textContent();
    await expect(orderId.includes(orderIdDetails)).toBeTruthy();
});
