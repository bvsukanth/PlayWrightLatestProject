import { test, expect, Locator, Page } from '@playwright/test';

export class CheckoutPage {

    selectCountry : Locator;
    searchResults : Locator;
    userName : Locator;
    submit : Locator;
    page : Page;

    constructor(page: Page) {
        this.page = page;
        this.selectCountry = page.locator("[placeholder='Select Country']");
        this.searchResults = page.locator(".ta-results");
        this.userName = page.locator(".user__name label");
        this.submit = page.locator(".action__submit");
    }

    async SelectCountry(countryName : string) {
        await this.selectCountry.pressSequentially("Ind");
        const results = this.searchResults;
        await results.waitFor();
        const optionsCount = await results.locator('button').count();

        for (let i = 0; i < optionsCount; i++) {
            let text : any;
            text  = await results.locator("button").nth(i).textContent();
            if (text.trim() === countryName) {
                await results.locator("button").nth(i).click();
                break;
            }
        }
    }

    async validateEmailClickSubmit(eMail : string, expect : any) {
        await expect(this.userName).toHaveText(eMail);
        await this.submit.click();
    }
}

module.exports = {CheckoutPage};