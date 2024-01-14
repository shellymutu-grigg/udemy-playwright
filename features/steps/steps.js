const { When, Then, Given } = require('@cucumber/cucumber');

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
        await orders.validateOrder(orderId);
    });