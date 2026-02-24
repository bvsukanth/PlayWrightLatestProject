const { test, expect } = require('@playwright/test');

test('Client App Playwright Locators', async ({ browser, page }) => {
    //const context = await browser.newContext();
    //const page = await context.newPage();

    const products = page.locator(".card-body b");
    const productName = "ZARA COAT 3";
    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder("email@example.com").fill("Tester@2223.com");
    await page.getByPlaceholder("enter your passsword").fill("Test@123");
    await page.getByRole("button", { name: 'Login' }).click();

    //1st wait mechanism in playwright to print allTextContents() directly instead of giving nth or first
    await page.waitForLoadState('networkidle');

    //2nd wait mechanism in playwright
    await page.locator(".card-body").first().waitFor();
    await page.locator(".card-body").filter({ hasText: "ZARA COAT 3" }).getByRole("button", { name: "Add To Cart" }).click();
    await page.getByRole("listitem").getByRole("button", { name: "Cart" }).click();
    await page.locator("div li").first().waitFor();

    //text finding based on tag
    await expect(page.getByText(productName)).toBeVisible();
    await page.getByRole("button", { name: 'Checkout' }).click();

    //pressSequentially can be done with delay also - await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });
    await page.getByPlaceholder("Select Country").pressSequentially("Ind");
    await page.getByRole("button", { name: 'India' }).nth(1).click();

    await page.getByText("PLACE ORDER").click();
    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();
});

