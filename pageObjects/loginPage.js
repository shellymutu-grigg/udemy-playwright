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
        await expect(this.page).toHaveTitle("Let's Shop");
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginBtn.click();
    }

    async resetPassword(username, password){
        await this.forgotPasswordLink.click();
        await this.emailField.fill(email);
        await this.resetPasswordField.fill(password);
        await this.confirmPasswordField.fill(password);
        await this.submitButton.click();
    
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginBtn.click();
    }
}
module.exports = { loginPage }