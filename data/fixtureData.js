const base = require('@playwright/test');

exports.customTest= base.test.extend(
    {
        testDataForOrder: {
            username: process.env.username_rahulshetty,
            password: process.env.password_rahulshetty,
            productName: 'ZARA COAT 3'
        }
    }
);