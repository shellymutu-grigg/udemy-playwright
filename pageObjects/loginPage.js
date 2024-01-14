const { expect } = require('@playwright/test');

class loginPage{

    constructor(page){
        this.page = page;
        this.usernameField = this.page.locator('#userEmail');
        this.passwordField = this.page.locator('#userPassword');
        this.loginBtn = this.page.locator('#login')
        this.forgotPasswordLink = this.page.locator('.forgot-password-link');
        this.emailField = this.page.locator("[type='email']");
        this.resetPasswordField = this.page.locator('#userPassword');
        this.confirmPasswordField = this.page.locator('#confirmPassword');
        this.submitButton = this.page.locator("[type='submit']");
    }

    async goTo(){
        await this.page.goto('https://rahulshettyacademy.com/client');
    }

    async login(username, password){
        console.log('Page title:', await this.page.title());
        await expect(this.page).toHaveTitle("Let's Shop");
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginBtn.click();
    }

    async checkLogin(username, password){
        await this.page.waitForLoadState('networkidle');
        const isLoggedIn = await this.page.locator("button:has-text('HOME')").isVisible();
        console.log('isLoggedIn:', isLoggedIn);

        if(!isLoggedIn){
            console.log('need to reset password');
            await this.resetPassword(username, password);
        }
    }

    async resetPassword(username, password){
        await this.forgotPasswordLink.click();
        await this.emailField.fill(username);
        await this.resetPasswordField.fill(password);
        await this.confirmPasswordField.fill(password);
        await this.submitButton.click();
    
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginBtn.click();
    }
}
module.exports = { loginPage }