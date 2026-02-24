const {test, expect, request} = require('@playwright/test');

test('Security Test 1', async({page}) => {

    await page.route("",);
    await page.locator("button:has-text('View')").click();
});