const {test, expect} = require('@playwright/test');

// Run in non headless mode: npx playwright test --headed 
// Run playwright UI: npx playwright test --ui 
// Run playwright UI: npx playwright test

test('A page context playwright test', async ({browser}) =>
{
    // Remember that JS is asynchronous not sequential
    // Create Chrome instance or inject page variable in fat arrow function
    let context = await browser.newContext();
    let page = await context.newPage();
    await page.goto('https://www.google.com/');

    // Print the page title
    console.log('Page title: ', await page.title());

    await expect(page).toHaveTitle('Google');
});

// test.only to run a single test
test('Injected page variable, check for login error message and then login playwright test', async ({browser, page}) =>
{
    let username = page.locator('#username');
    let password = page.locator("[type='password']");
    let signInBtn = page.locator('#signInBtn')
    let cardTitles = page.locator(".card-body a");
    // Remember that JS is asynchronous not sequential
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    // Print the page title
    console.log('Page title: ', await page.title());

    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    await username.fill('rahulshetty');
    await password.fill('learning');
    await signInBtn.click();

    // Print out error message text
    console.log('Error text:', await page.locator("[style*='block']").textContent());

    await expect(page.locator("[style*='block']")).toContainText('Incorrect username');

    await username.fill('rahulshettyacademy');
    await password.fill('learning');
    await signInBtn.click();

    // Print the text of the second card title
    console.log('Card title text ', await cardTitles.nth(1).textContent());

    // allTextContent() method will not wait for element load like at L#49
    let allCardTitles = await cardTitles.allTextContents();
    console.log('All card titles text ', allCardTitles);
});

test.only('Login', async ({browser, page}) =>
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

    // Print the text of the first card title
    console.log('Card title text ', await cardTitles.first().textContent());

    // allTextContent() method will not wait for element load like at L#49
    let allCardTitles = await cardTitles.allTextContents();
    console.log('All card titles text ', allCardTitles);
});