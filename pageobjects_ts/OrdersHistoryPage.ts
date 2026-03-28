import { test, expect, Locator, Page } from '@playwright/test';

export class OrdersHistoryPage {

    tablebody : Locator;
    rowscount : Locator;
    tableOrderIDDetails : Locator;
    page : Page;

    constructor(page: Page) {
        this.page = page;
        this.tablebody = page.locator("tbody");
        this.rowscount = page.locator("tbody tr");
        this.tableOrderIDDetails = page.locator(".col-text");


    }

    async clickOnOrderIDandReturnID(orderID: string) {
        await this.tablebody.waitFor();
        const rows = await this.rowscount;


        for (let i = 0; i < await rows.count(); ++i) {
            let rowOrderId : any;
            rowOrderId = await rows.nth(i).locator("th").textContent();
            if (orderID.includes(rowOrderId)) {
                await rows.nth(i).locator("button").first().click();
                break;
            }
        }
        const orderIdDetails = await this.tableOrderIDDetails.textContent();
        return orderIdDetails;
    }
}

module.exports = { OrdersHistoryPage };