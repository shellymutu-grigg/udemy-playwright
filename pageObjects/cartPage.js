const { expect } = require('@playwright/test');

class cartPage{

    constructor(page){
        this.page = page;
        this.ordersList = this.page.locator('div li');
        this.checkout = this.page.locator('text=Checkout');
        this.selectCountry = this.page.locator("[placeholder='Select Country']");
        this.dropdownOptions = this.page.locator('.ta-results');
        this.usernameMessage = this.page.locator(".user__name [type='text']");
        this.submit = this.page.locator('.action__submit');
        this.message = this.page.locator('.hero-primary');
    }

    async placeOrder(productName){
        await this.ordersList.first().waitFor();

        // isVisible() does not implement the auto wait
        const isPresent = await this.page.locator("h3:has-text('" + productName + "')").isVisible();
        expect(isPresent).toBeTruthy();
        await this.checkout.click();
        await this.selectCountry.pressSequentially('new z');
        await this.dropdownOptions.waitFor();
        const optionsCount = await this.dropdownOptions.locator('button').count();
        for(let i = 0; i < optionsCount; i++){
            const text = await this.dropdownOptions.locator('button').nth(i).textContent();
            if(text.trim() === 'New Zealand'){
                await this.dropdownOptions.locator('button').nth(i).click();
                break;
            }
        }
    }

    async validateOrderSuccessMessage(username){
        await expect(this.usernameMessage.first()).toHaveText(username);
        await this.submit.click();
        await expect(this.message).toHaveText(' Thankyou for the order. ');
    }
}
module.exports = { cartPage }