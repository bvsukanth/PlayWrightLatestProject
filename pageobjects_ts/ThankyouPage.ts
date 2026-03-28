import { test, expect, Locator, Page } from '@playwright/test';

export class ThankyouPage {

    successMessage : Locator;
    orderID : Locator;
    ordersPage : Locator;
    page : Page;


    constructor(page: Page) {
        this.page = page;

         this.successMessage = page.locator(".hero-primary");
         this.orderID = page.locator(".em-spacer-1 .ng-star-inserted");
         this.ordersPage = page.locator("button[routerlink*='myorders']");
       
    }

    async validateSuccessMessageReturnorderID(expect : any)
    {
        await expect(this.successMessage).toHaveText(" Thankyou for the order. ");
        const orderID = await this.orderID.textContent();
        return orderID;
    }

    async navigateToOrdersPage()
    {
        await this.ordersPage.click();
    }
}

module.exports = { ThankyouPage };