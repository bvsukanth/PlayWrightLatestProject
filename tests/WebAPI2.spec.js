const {test, expect} = require('@playwright/test');
let webContext;

test.beforeAll(async ({browser})=> {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("Tester@2223.com");
    await page.locator("[formcontrolname='userPassword']").fill("Test@123");
    await page.locator(".login-btn").click();


    //1st wait mechanism in playwright to print allTextContents() directly instead of giving nth or first
    await page.waitForLoadState('networkidle');
    await context.storageState({path:'state.json'});
    webContext = await browser.newContext({storageState:'state.json'});
});

test('Place Order regular',async ({})=>
{
    //const context = await browser.newContext();
    //const page = await context.newPage();

    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    const products = page.locator(".card-body b");
    const productName = "ZARA COAT 3";
   

    //2nd wait mechanism in playwright
    await page.locator(".card-body b").first().waitFor();

    console.log(await page.locator(".card-body b").allTextContents());

    const count = await products.count();

    for(let i=0; i<count;i++)
    {
        if(await page.locator(".card-body b").nth(i).textContent() == productName)
        {
            //just text finding
            await page.locator(".card-body").nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    await page.locator("[routerlink='/dashboard/cart']").click();
    //expect(await page.locator(".cartSection h3")).toContainText(productName);

    await page.locator("div li").first().waitFor();

    //text finding based on tag
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();

    
    
    await page.locator("button:has-text('Checkout')").click();

    //pressSequentially can be done with delay also - await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });
    await page.locator("[placeholder='Select Country']").pressSequentially("Ind");
    const results = page.locator(".ta-results");
    await results.waitFor();
    const optionsCount = await results.locator('button').count();

    for(let i=0; i< optionsCount ;i++)
    {
        const text = await results.locator("button").nth(i).textContent();
        if(text.trim() === "India")
        {
            await results.locator("button").nth(i).click();
            break;
        }
    }

    await expect(page.locator(".user__name label")).toHaveText("Tester@2223.com");

    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

    const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log("Order ID : " + orderID);

    await page.locator("button[routerlink*='myorders']").click();

    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
 
 
    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderID.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderID.includes(orderIdDetails)).toBeTruthy();
        

    //await page.pause();
   
});

test('Place Order regular test case 2',async ({})=>
{
    //const context = await browser.newContext();
    //const page = await context.newPage();

    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    const products = page.locator(".card-body b");
    const productName = "ZARA COAT 3";
   

    //2nd wait mechanism in playwright
    await page.locator(".card-body b").first().waitFor();

    console.log(await page.locator(".card-body b").allTextContents());

    const count = await products.count();

    for(let i=0; i<count;i++)
    {
        if(await page.locator(".card-body b").nth(i).textContent() == productName)
        {
            //just text finding
            await page.locator(".card-body").nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    await page.locator("[routerlink='/dashboard/cart']").click();
    //expect(await page.locator(".cartSection h3")).toContainText(productName);

    await page.locator("div li").first().waitFor();

    //text finding based on tag
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();

    
    
    await page.locator("button:has-text('Checkout')").click();

    //pressSequentially can be done with delay also - await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });
    await page.locator("[placeholder='Select Country']").pressSequentially("Ind");
    const results = page.locator(".ta-results");
    await results.waitFor();
    const optionsCount = await results.locator('button').count();

    for(let i=0; i< optionsCount ;i++)
    {
        const text = await results.locator("button").nth(i).textContent();
        if(text.trim() === "India")
        {
            await results.locator("button").nth(i).click();
            break;
        }
    }

    await expect(page.locator(".user__name label")).toHaveText("Tester@2223.com");

    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

    const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log("Order ID : " + orderID);
   
});

