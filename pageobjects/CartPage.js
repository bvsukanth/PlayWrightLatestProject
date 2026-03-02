class CartPage {

    constructor(page) {
        this.page = page;
        this.firstElement = page.locator("div li");
        this.checkoutButton = page.locator("button:has-text('Checkout')");
    }

    async ValidateProductinCart(productName, expect) {
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