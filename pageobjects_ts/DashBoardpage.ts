import { test, expect, Locator, Page } from '@playwright/test';

export class DashBoardpage {

    products : Locator;
    productsText : Locator;
    cart : Locator  ;
    page : Page;
    constructor(page: Page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink='/dashboard/cart']");

    }

    async searchProductAddCart(productName :string) {
        await this.productsText.first().waitFor();

        console.log(await this.productsText.allTextContents());

        const count = await this.productsText.count();

        for (let i = 0; i < count; i++) {
            if (await this.productsText.nth(i).textContent() === productName) {
                //just text finding
                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
    }

    async navigateToCart()
    {
        await this.cart.click();
    }

    

}

module.exports = {DashBoardpage};