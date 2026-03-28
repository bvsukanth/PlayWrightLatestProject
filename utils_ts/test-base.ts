import {test as bastTest} from '@playwright/test';

export const customTest = bastTest.extend<{
    testDataforOrder: {
        username: string;
        password: string;
        productName: string;
    }
}>(
    {
        testDataforOrder: {
            username: "Tester@2223.com",
            password: "Test@123",
            productName: "ZARA COAT 3"
        }
    }
)