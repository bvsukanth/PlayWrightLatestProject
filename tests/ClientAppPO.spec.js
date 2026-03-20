const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');

test('Place Order regular', async ({ browser, page }) => {
    
    const poManager = new POManager(page);
    const products = page.locator(".card-body b");
    const productName = "ZARA COAT 3";
    
    const loginPage = poManager.getLoginPage();
    const email = "Tester@2223.com";
    const password = "Test@123";
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

