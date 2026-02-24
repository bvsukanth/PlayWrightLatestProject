const { test, expect } = require("@playwright/test")

test('More Validations in Playwright', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    //Below code is for going forward and back ward
    // await page.goto("http://google.com");
    // await page.goBack();
    // await page.goForward();
    // await page.goBack();

    //Code to check hidden elements    
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeHidden();

    //Code to handle pop ups    
    await page.on("dialog", dialog => dialog.accept());
    await page.locator("#alertbtn").click();

    //Code to handle Hover
    await page.locator("#mousehover").hover();
    //await page.locator(".mouse-hover-content").getByText("Top").click();

    //How to Handle frames
    const framesPage = await page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck = await framesPage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);

});

test('Screenshot and Visual comparision', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    //Below code is for going forward and back ward
    // await page.goto("http://google.com");
    // await page.goBack();
    // await page.goForward();
    // await page.goBack();

    //Code to check hidden elements    
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible();
    await page.locator("#displayed-text").screenshot({ path: "partialscreenshot.jpg" });
    await page.locator("#hide-textbox").click();
    await page.screenshot({ path: "screenshot.jpg" });
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeHidden();
});

test.only('Visual testing', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/client/");
    expect(await page.screenshot()).toMatchSnapshot("landing.png");
});