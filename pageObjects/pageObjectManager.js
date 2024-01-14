const { loginPage } = require('../pageObjects/loginPage');
const { dashboardPage } = require('../pageObjects/dashboardPage');
const { cartPage } = require('../pageObjects/cartPage');
const { orderPage } = require('../pageObjects/orderPage');
const { ordersPage } = require('../pageObjects/ordersPage');

class pageObjectManager{
    constructor(page){
        this.page = page;
        this.loginPage = new loginPage(this.page);
        this.dashboardPage = new dashboardPage(this.page);
        this.cartPage = new cartPage(this.page);
        this.orderPage = new orderPage(this.page);
        this.ordersPage = new ordersPage(this.page);
    }

    getLoginPage(){
        return this.loginPage;
    }

    getDashboardPage(){
        return this.dashboardPage;
    }

    getCartPage(){
        return this.cartPage;
    }

    getOrderPage(){
        return this.orderPage;
    }

    getOrdersPage(){
        return this.ordersPage;
    }
}
module.exports = { pageObjectManager }