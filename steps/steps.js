const { test, expect, playwright } = require('@playwright/test');
const { customTest } = require('../data/fixtureData');
const { pageObjectManager } = require('../pageObjects/pageObjectManager');
const { When, Then, Given } = require('@cucumber/cucumber');

const pageObjects = new pageObjectManager(page);
let orderId;

    Given('a user is able to login with {username} and {password}', async function (username, password) {
        const browser = playwright.chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
    
        const login = pageObjects.getLoginPage(page);        
        await login.goTo();
        await login.login(username, password);
    });
       
    When('add {item} item to cart', async function (item) {
        const dashboard = pageObjects.getDashboardPage(page);
        await dashboard.addProductToCart(productName);
        await dashboard.navigateToCart();
    });
  
    Then('verify that {productName} item is displayed in the cart and place order', async function (productName) {
        const cart = pageObjects.getCartPage(page);
        await cart.placeOrder(productName, username);
    });
       
    Then('validate the order placed successfully and navigate to order history page', async function () {
        const cart = pageObjects.getCartPage(page);
        await cart.validateOrderSuccessMessage(username);

        const order = pageObjects.getOrderPage(page);
        orderId = await order.confirmOrderDetails();
        await order.navigateToOrdersPage();
    });
       
    Then('verify that the order is present in the order history', async function () {
        const orders = pageObjects.getOrdersPage(page);
        await orders.validateOrder(orderId);
    });