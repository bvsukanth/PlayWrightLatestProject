const { test, expect, request } = require('@playwright/test');

test('Security Test 1', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("Tester@2223.com");
    await page.locator("[formcontrolname='userPassword']").fill("Test@123");
    await page.locator(".login-btn").click();


    //1st wait mechanism in playwright to print allTextContents() directly instead of giving nth or first
    await page.waitForLoadState('networkidle');

    //2nd wait mechanism in playwright
    await page.locator(".card-body b").first().waitFor();
    await page.locator("button[routerlink*='myorders']").click();



    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=699cf37abab2bcf4cba1364k" })
    );
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
});