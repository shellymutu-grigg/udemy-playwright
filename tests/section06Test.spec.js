const {test, expect} = require('@playwright/test');
const exp = require('constants');

// Run in non headless mode: npx playwright test --headed 
// Run playwright UI: npx playwright test --ui 
// Run playwright UI: npx playwright test
// Run specific playwright file: npx playwright test tests/section04Test.spec.js 
// test.only to run a single test
// Run specific playwright file in debug mode: npx playwright test tests/section04Test.spec.js --debug
// Generate code: npx playwright codegen htps://www.google.com

test('Playwright script to dynamically find product', async ({page}) =>
{
    let username = page.locator('#userEmail');
    let password = page.locator('#userPassword');
    let loginBtn = page.locator('#login')
    let cardTitles = page.locator(".card-body b");
    let products = page.locator(".card-body");
    let productName = 'ZARA COAT 3';

    await page.goto('https://rahulshettyacademy.com/client');

    // Print the page title
    console.log('Page title: ', await page.title());

    await expect(page).toHaveTitle("Let's Shop");
    await username.fill(process.env.username_rahulshetty);
    await password.fill(process.env.password_rahulshetty);
    await loginBtn.click();
    await page.waitForLoadState('networkidle');
    const isLoggedIn = await page.locator("button:has-text('HOME')").isVisible();
    console.log('isLoggedIn:', isLoggedIn);

    if(!isLoggedIn){
        await resetPassword(page, username, password, loginBtn);
    }

    // allTextContent() method will not wait for element load like at L#49
    await page.waitForLoadState('networkidle');
    let allCardTitles = await cardTitles.allTextContents();
    console.log('All product titles:', allCardTitles);

    let count = await products.count();
    console.log('count:', count);
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
    const isPresent = page.locator("h3:has-text('" + productName + "')").isVisible();
    await expect(isPresent).toBeTruthy();

});

async function resetPassword(page, username, password, loginBtn){
    await page.locator('.forgot-password-link').click();
    await page.locator("[type='email']").fill(process.env.username_rahulshetty);
    await page.locator('#userPassword').fill(process.env.password_rahulshetty);
    await page.locator('#confirmPassword').fill(process.env.password_rahulshetty);
    await page.locator("[type='submit']").click();

    await username.fill(process.env.username_rahulshetty);
    await password.fill(process.env.password_rahulshetty);
    await loginBtn.click();
}