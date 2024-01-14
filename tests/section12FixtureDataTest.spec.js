/** 
 * Run in non headless mode: npx playwright test --headed 
 * Run playwright UI: npx playwright test --ui 
 * Run playwright: npx playwright test
 * Run specific playwright file: npx playwright test tests/section12FixtureDataTest.spec.js 
 * test.only to run a single test
 * Run specific playwright file in debug mode: npx playwright test tests/section12FixtureDataTest.spec.js --debug
 * Generate code: npx playwright codegen htps://www.google.com
 * Run test with specfic config file npx playwright test tests/section12FixtureDataTest.spec.js--config playwright.config-other.js 
 * Run specific project in config file npx playwright test tests/section12FixtureDataTest.spec.js --config playwright.config-other.js --project=safari
 * Run for speciic device type npx playwright test tests/section12FixtureDataTest.spec.js --config playwright.config-other.js --project=iPhone11
*/

const { customTest } = require('../data/fixtureData');
const { pageObjectManager } = require('../pageObjects/pageObjectManager');

customTest('Playwright execute tests using fixture data', async ({ page, testDataForOrder }) =>
{
    const username = testDataForOrder.username;
    const password = testDataForOrder.password;
    const productName = testDataForOrder.productName;

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

    await cart.placeOrder(productName);
    await cart.validateOrderSuccessMessage(username);

    const orderId = await order.confirmOrderDetails();
    await order.navigateToOrdersPage();

    await orders.validateOrder(orderId);
});
