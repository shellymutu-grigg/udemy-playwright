const { expect } = require('@playwright/test');

class ordersPage{

    constructor(page){
        this.page = page;
        this.ordersTable = this.page.locator("tbody tr");
    }

    async validateOrder(orderId){
        const rows = await this.ordersTable;
        const rowCount = await rows.count();
        for(let i = 0; i < rowCount; i++){
            const rowOrderId = await rows.nth(i).locator('th').textContent();
            if(orderId.includes(rowOrderId)){
                await rows.nth(i).locator('button').first().click();
                const orderIdDetails = await this.page.locator('.col-text').textContent();
                await expect(orderId.includes(orderIdDetails)).toBeTruthy();
                break;
            }
        }
    }
}
module.exports = { ordersPage }