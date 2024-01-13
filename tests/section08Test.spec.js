/** 
 * Run in non headless mode: npx playwright test --headed 
 * Run playwright UI: npx playwright test --ui 
 * Run playwright: npx playwright test
 * Run specific playwright file: npx playwright test tests/section08Test.spec.js 
 * test.only to run a single test
 * Run specific playwright file in debug mode: npx playwright test tests/section08Test.spec.js --debug
 * Generate code: npx playwright codegen htps://www.google.com
*/

const { test, expect } = require('@playwright/test');

test('Playwright navigation & handling hidden elements', async ({ page }) =>
{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await page.goto('https://www.google.com');
    await page.goBack();
    await page.goForward();
    await page.goBack();

    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();
});

test('Playwright handling dialog pop-ups & hover', async ({ page }) =>
{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    await page.locator('#confirmbtn').click();
    // dialog => dialog.dismiss()
    await page.on('dialog', dialog => dialog.accept());

    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();

    await page.locator('#mousehover').hover();
});

test.only('Playwright handling iframes', async ({ page }) =>
{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    const framesPage = page.frameLocator('#courses-iframe');
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    const headerText = await framesPage.locator('.text h2').textContent();
    console.log('Number in header:', headerText.split(' ')[1]);
});