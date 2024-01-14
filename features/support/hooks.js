const { pageObjectManager } = require('../../pageObjects/pageObjectManager');
const playwright = require('@playwright/test');
const { After, Before, AfterStep, Status } = require('@cucumber/cucumber');

Before({ tags: '@error or @validation'}, async function (){
    const browser = await playwright.chromium.launch({
        headless: false
    });
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.pageObjects = new pageObjectManager(this.page);
});

AfterStep(async function ({ result }){
    if(result.status === Status.FAILED){
        await this.page.screenshot({ path: `./features/${result.status}.png`});
    }
});

After(async function (){
    console.log('Test complete');
});