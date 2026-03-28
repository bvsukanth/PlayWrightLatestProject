import { test, expect, Locator, Page } from '@playwright/test';

export class CartPage {

    firstElement : Locator;
    checkoutButton : Locator;
    page : Page;

    constructor(page: Page) {
        this.page = page;
        this.firstElement = page.locator("div li");
        this.checkoutButton = page.locator("button:has-text('Checkout')");
    }

    async ValidateProductinCart(productName : any, expect : any) {
        await this.firstElement.first().waitFor();

        //text finding based on tag
        const bool = await this.page.locator("h3:has-text('" + productName + "')").isVisible();
        expect(bool).toBeTruthy();
    }

    async NavgatetoCheckout()
    {
        await this.checkoutButton.click();
    }
}

module.exports = {CartPage};