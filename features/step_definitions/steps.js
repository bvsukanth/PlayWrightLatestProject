const { Given, When, Then } = require('@cucumber/cucumber')
const { POManager } = require('../../pageobjects');
const { test, expect, playwright } = require('@playwright/test');

Given('a login to ecomm application with {username} and  {password}', async function (username, password) {
    // Write code here that turns the phrase above into concrete actions

    const browser = await playwright.chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    const poManager = new POManager(page);
    const products = page.locator(".card-body b");
    const productName = data.productName;

    const loginPage = poManager.getLoginPage();
    const email = data.username;
    const password = data.password;
    await loginPage.goTo();
    await loginPage.validLogin(email, password);
});

When('Add {string} to cart', async function (string) {
    // Write code here that turns the phrase above into concrete actions
    const dashboardPage = poManager.getDashBoardPage();
    await dashboardPage.searchProductAddCart(productName);
    await dashboardPage.navigateToCart();
});

Then('Verify {string} is displayed in cart', async function (string) {
    // Write code here that turns the phrase above into concrete actions
    const cartPage = poManager.getcartPage();
    await cartPage.ValidateProductinCart(productName, expect);
    await cartPage.NavgatetoCheckout();

});


When('Enter valid details and place the order', async function () {
    // Write code here that turns the phrase above into concrete actions
    const checkoutPage = poManager.getcheckOutPage();
    await checkoutPage.SelectCountry("India");
    await checkoutPage.validateEmailClickSubmit(email, expect);

    const thankyouPage = poManager.getthankyouPage();
    const orderID = await thankyouPage.validateSuccessMessageReturnorderID(expect);
    await thankyouPage.navigateToOrdersPage();
});

Then('Verify order is present in orderhistory', async function () {
    // Write code here that turns the phrase above into concrete actions
    const ordersHistoryPage = poManager.getordersHistoryPage();
    const orderIdDetails = await ordersHistoryPage.clickOnOrderIDandReturnID(orderID);

    expect(orderID.includes(orderIdDetails)).toBeTruthy();
});
