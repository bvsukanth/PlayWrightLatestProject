class ThankyouPage {

    constructor(page) {
        this.page = page;

         this.successMessage = page.locator(".hero-primary");
         this.orderID = page.locator(".em-spacer-1 .ng-star-inserted");
         this.ordersPage = page.locator("button[routerlink*='myorders']");
       
    }

    async validateSuccessMessageReturnorderID(expect)
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