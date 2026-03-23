const { test, expect } = require('@playwright/test');
const {customTest} = require("../utils/test-base");
const { POManager } = require('../pageobjects/POManager');
const dataSet = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));

for(const data of dataSet)
{
    test(`Place Order regular with PO for ${data.productName}`, async ({page }) => {

        const poManager = new POManager(page);
        const products = page.locator(".card-body b");
        const productName = data.productName;

        const loginPage = poManager.getLoginPage();
        const email = data.username;
        const password = data.password;
        await loginPage.goTo();
        await loginPage.validLogin(email, password);

        const dashboardPage = poManager.getDashBoardPage();
        await dashboardPage.searchProductAddCart(productName);
        await dashboardPage.navigateToCart();

        const cartPage = poManager.getcartPage();
        await cartPage.ValidateProductinCart(productName, expect);
        await cartPage.NavgatetoCheckout();

        const checkoutPage = poManager.getcheckOutPage();
        await checkoutPage.SelectCountry("India");
        await checkoutPage.validateEmailClickSubmit(email, expect);

        const thankyouPage = poManager.getthankyouPage();
        const orderID = await thankyouPage.validateSuccessMessageReturnorderID(expect);
        await thankyouPage.navigateToOrdersPage();

        const ordersHistoryPage = poManager.getordersHistoryPage();
        const orderIdDetails = await ordersHistoryPage.clickOnOrderIDandReturnID(orderID);

        expect(orderID.includes(orderIdDetails)).toBeTruthy();

    });

}

customTest(`Place Order regular with PO `, async ({page, testDataforOrder}) => {

        const poManager = new POManager(page);
        const products = page.locator(".card-body b");
        const productName = testDataforOrder.productName;

        const loginPage = poManager.getLoginPage();
        const email = testDataforOrder.username;
        const password = testDataforOrder.password;
        await loginPage.goTo();
        await loginPage.validLogin(email, password);

        const dashboardPage = poManager.getDashBoardPage();
        await dashboardPage.searchProductAddCart(productName);
        await dashboardPage.navigateToCart();

        const cartPage = poManager.getcartPage();
        await cartPage.ValidateProductinCart(productName, expect);
        await cartPage.NavgatetoCheckout();
});
