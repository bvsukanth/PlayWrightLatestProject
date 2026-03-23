const base = require('@playwright/test');

exports.customTest = base.test.extend(
    {
        testDataforOrder: {
            username: "Tester@2223.com",
            password: "Test@123",
            productName: "ZARA COAT 3"
        }
    }
)