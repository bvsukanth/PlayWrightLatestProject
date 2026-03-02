class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.selectCountry = page.locator("[placeholder='Select Country']");
        this.searchResults = page.locator(".ta-results");
        this.userName = page.locator(".user__name label");
        this.submit = page.locator(".action__submit");
    }

    async SelectCountry(countryName) {
        await this.selectCountry.pressSequentially("Ind");
        const results = this.searchResults;
        await results.waitFor();
        const optionsCount = await results.locator('button').count();

        for (let i = 0; i < optionsCount; i++) {
            const text = await results.locator("button").nth(i).textContent();
            if (text.trim() === countryName) {
                await results.locator("button").nth(i).click();
                break;
            }
        }
    }

    async validateEmailClickSubmit(eMail, expect) {
        await expect(this.userName).toHaveText(eMail);
        await this.submit.click();
    }
}

module.exports = {CheckoutPage};