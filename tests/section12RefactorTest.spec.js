/** 
 * Run in non headless mode: npx playwright test --headed 
 * Run playwright UI: npx playwright test --ui 
 * Run playwright: npx playwright test
 * Run specific playwright file: npx playwright test tests/section12RefactorTest.spec.js 
 * test.only to run a single test
 * Run specific playwright file in debug mode: npx playwright test tests/section12RefactorTest.spec.js --debug
 * Generate code: npx playwright codegen htps://www.google.com
*/

const { test, expect } = require('@playwright/test');
const { loginPage } = require('../pageObjects/loginPage');
const { dashboardPage } = require('../pageObjects/dashboardPage');
const { cartPage } = require('../pageObjects/cartPage');
const { orderPage } = require('../pageObjects/orderPage');
const { ordersPage } = require('../pageObjects/ordersPage');

test('Playwright refactor to use page objects model', async ({ page }) =>
{
    const username = process.env.username_rahulshetty;
    const password = process.env.password_rahulshetty;
    const productName = 'ZARA COAT 3';
    
    const login = new loginPage(page);
    const dashboard = new dashboardPage(page);
    const cart = new cartPage(page);
    const order = new orderPage(page);
    const orders = new ordersPage(page);

    await login.goTo();
    await login.login(username, password);

    await dashboard.addProductToCart(productName);
    await dashboard.navigateToCart();

    await cart.placeOrder(productName, username);

    const orderId = await order.confirmOrderDetails();
    await order.navigateToOrdersPage();

    await orders.validateOrder(orderId);
});
