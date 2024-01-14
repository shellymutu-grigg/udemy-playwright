
const { expect } = require('@playwright/test');

class dashboardPage{

    constructor(page){
        this.page = page;
        this.productTitles = this.page.locator(".card-body b");
        this.products = this.page.locator(".card-body");
        this.homeLink = this.page.locator("button:has-text('HOME')");
        this.cartLink = this.page.locator("[routerlink='/dashboard/cart']");
    }

    async addProductToCart(productName){
        await this.page.waitForLoadState('networkidle');
        await this.homeLink.isVisible();
        const allProductTitles = await this.productTitles.allTextContents();
        console.log('All product titles:', allProductTitles);

        const count = await this.products.count();
        for(let i = 0; i < count; i++){
            const currentProductName = await this.products.nth(i).locator('b').textContent();
            if(await currentProductName === productName){
                // Add the product to cart
                await this.products.nth(i).locator("button:has-text(' Add To Cart')").click();
                const message = await this.page.locator('.toast-message'); 
                console.log('message:', productName + await message.textContent());
                await expect(message).toHaveText(' Product Added To Cart ');
                break;
            }
        }
    }

    async navigateToCart(){
        await this.cartLink.click();
    }
}
module.exports = { dashboardPage };