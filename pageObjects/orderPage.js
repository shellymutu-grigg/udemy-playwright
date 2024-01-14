class orderPage{

    constructor(page){
        this.page = page;
        this.orderId = this.page.locator('.em-spacer-1 .ng-star-inserted');
        this.ordersLink = this.page.locator("button[routerlink='/dashboard/myorders']")
    }

    async confirmOrderDetails(){
        const orderNumber = (await this.orderId.textContent()).split(' ')[2];
        console.log('Order number:', orderNumber);
        return orderNumber;
    }

    async navigateToOrdersPage(){
        await this.ordersLink.click();
        await this.page.waitForLoadState('networkidle');
        await this.page.locator('tbody').waitFor();
    }
}
module.exports = { orderPage }