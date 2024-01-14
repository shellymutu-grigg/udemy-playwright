const { When, Then, Given } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

    Given('a user is able to login with username and password', { timeout: 100 * 1000}, async function () {
        this.login = await this.pageObjects.getLoginPage(this.page);     
        await this.login.goTo();
        await this.login.login(process.env.username_rahulshetty, process.env.password_rahulshetty);
        await this.login.checkLogin(process.env.username_rahulshetty, process.env.password_rahulshetty);
    });
       
    When('add {string} item to cart', async function (productName) {
        const dashboard = await this.pageObjects.getDashboardPage(this.page);
        await dashboard.addProductToCart(productName);
        await dashboard.navigateToCart();
    });
  
    Then('verify that {string} item is displayed in the cart and place order', async function (productName) {
        const cart = this.pageObjects.getCartPage(this.page);
        await cart.placeOrder(productName);
    });
       
    Then('validate the order for username has been placed successfully and navigate to order history page', async function () {
        const cart = this.pageObjects.getCartPage(this.page);
        await cart.validateOrderSuccessMessage(process.env.username_rahulshetty);

        const order = this.pageObjects.getOrderPage(this.page);
        this.orderId = await order.confirmOrderDetails();
        await order.navigateToOrdersPage();
    });
       
    Then('verify that the order is present in the order history', async function () {
        const orders = this.pageObjects.getOrdersPage(this.page);
        await orders.validateOrder(this.orderId);
    });

    Given('a user is tries to login with invalid {string} and {string}', async function (username, password) {
        const usernameField = this.page.locator('#username');
        const passwordField = this.page.locator("[type='password']");
        const signInBtn = this.page.locator('#signInBtn')
        await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
        console.log('Page title: ', await this.page.title());

        await expect(this.page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
        await usernameField.fill(username);
        await passwordField.fill(password);

        await Promise.all(
            [
                this.page.waitForURL('**/loginpagePractise/'),
                await signInBtn.click(),
            ]
        )
    });

    Then('verify the error message is displayed', async function () {
        const usernameField = this.page.locator('#username');
        const passwordField = this.page.locator("[type='password']");
        const signInBtn = this.page.locator('#signInBtn')
        console.log('Error text:', await this.page.locator("[style*='block']").textContent());

        await expect(this.page.locator("[style*='block']")).toContainText('Incorrect username');

        await usernameField.fill('rahulshettyacademy');
        await passwordField.fill('learning');
        await signInBtn.click();
    });