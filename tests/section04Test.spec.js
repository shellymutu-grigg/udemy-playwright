const {test, expect} = require('@playwright/test');

// Run in non headless mode: npx playwright test --headed 
// Run playwright UI: npx playwright test --ui 
// Run playwright UI: npx playwright test
// Run specific playwright file: npx playwright test tests/uiLoginTest.spec.js 
// test.only to run a single test

test('Injected page variable, check for login error message and then login playwright test', async ({browser, page}) =>
{
    let username = page.locator('#username');
    let password = page.locator("[type='password']");
    let signInBtn = page.locator('#signInBtn')
    let dropdown = page.locator("select.form-control");
    let radioButton = page.locator('.radiotextsty').last();
    let checkbox = page.locator('#terms');
    // Remember that JS is asynchronous not sequential
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
});