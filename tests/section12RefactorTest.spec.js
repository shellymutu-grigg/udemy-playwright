/** 
 * Run in non headless mode: npx playwright test --headed 
 * Run playwright UI: npx playwright test --ui 
 * Run playwright: npx playwright test
 * Run specific playwright file: npx playwright test tests/section12RefactorTest.spec.js 
 * test.only to run a single test
 * Run specific playwright file in debug mode: npx playwright test tests/section12RefactorTest.spec.js --debug
 * Generate code: npx playwright codegen htps://www.google.com
*/

const { test } = require('@playwright/test');
const { pageObjectManager } = require('../pageObjects/pageObjectManager');
const testData = require('../data/testData');

test('Playwright refactor to use page objects model', async ({ page }) =>
{
    const username = testData[0].username;
    const password = testData[0].password;
    const productName = testData[0].productName;

    const pageObjects = new pageObjectManager(page);
    const login = pageObjects.getLoginPage(page);
    const dashboard = pageObjects.getDashboardPage(page);
    const cart = pageObjects.getCartPage(page);
    const order = pageObjects.getOrderPage(page);
    const orders = pageObjects.getOrdersPage(page);

    await login.goTo();
    await login.login(username, password);

    await dashboard.addProductToCart(productName);
    await dashboard.navigateToCart();

    await cart.placeOrder(productName, username);

    const orderId = await order.confirmOrderDetails();
    await order.navigateToOrdersPage();

    await orders.validateOrder(orderId);
});
