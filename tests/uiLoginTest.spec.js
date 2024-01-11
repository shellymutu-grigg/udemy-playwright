const {test, expect} = require('@playwright/test');

// Run in non headless mode: npx playwright test --headed 
// Run playwright UI: npx playwright test --ui 
// Run playwright UI: npx playwright test
// Run specific playwright file: npx playwright test tests/uiLoginTest.spec.js 

test('Login and wait for network to be idle', async ({browser, page}) =>
{
    let username = page.locator('#userEmail');
    let password = page.locator('#userPassword');
    let loginBtn = page.locator('#login')
    let cardTitles = page.locator(".card-body b");

    // Remember that JS is asynchronous not sequential
    await page.goto('https://rahulshettyacademy.com/client');

    // Print the page title
    console.log('Page title: ', await page.title());

    await expect(page).toHaveTitle("Let's Shop");
    await username.fill('shellymutugrigg@gmail.com');
    await password.fill('gazxHSwK$oBbd*c43t4S');
    await loginBtn.click();

    // allTextContent() method will not wait for element load like at L#49
    await page.waitForLoadState('networkidle');
    // await cardTitles.first().waitFor();
    let allCardTitles = await cardTitles.allTextContents();
    console.log('All card titles text ', allCardTitles);
});