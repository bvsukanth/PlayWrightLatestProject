const {test, expect} = require('@playwright/test');

test('Browser context',async ({browser, page})=>
{
    //const context = await browser.newContext();
    //const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("Tester@2223.com");
    await page.locator("[formcontrolname='userPassword']").fill("Test@123");
    await page.locator(".login-btn").click();


    //1st wait mechanism in playwright to print allTextContents() directly instead of giving nth or first
    await page.waitForLoadState('networkidle');

    //2nd wait mechanism in playwright
    await page.locator(".card-body b").first().waitFor();

    console.log(await page.locator(".card-body b").allTextContents());
    
   
});

