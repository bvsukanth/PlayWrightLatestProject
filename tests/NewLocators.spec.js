const { test, expect } = require('@playwright/test');

test('Playwright Special Locators', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();

    //we can use check() for radio button or checkbox
    await page.getByLabel("Employed").check();

    //getByLabel used along with selctOption for dropdown
    await page.getByLabel("Gender").selectOption(("Female"));

    await page.getByPlaceholder("Password").fill("password");
    await page.getByRole("button", { name: 'Submit' }).click();
    const bool = await page.getByText(" The Form has been submitted successfully!.").isVisible();
    expect(bool).toBeTruthy();

    await page.getByRole("link", { name: 'Shop' }).click();

    //one powerful step looped with all
    await page.locator("app-card").filter({ hasText: 'Nokia Edge' }).getByRole("button", { name: "Add" }).click();

});