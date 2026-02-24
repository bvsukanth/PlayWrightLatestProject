const { test, expect, request } = require('@playwright/test');
const loginPayload = { userEmail: "Tester@2223.com", userPassword: "Test@123" };
const orderpayLoad = { orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
let token;
let orderId;
const { APIUtils } = require('./utils/APIUtils');
let response;

test.beforeAll(async () => {


    //Login API
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderpayLoad);



});

test.beforeEach(() => {



});

test('Place order', async ({ browser, page }) => {



    page.addInitScript(value => {

        window.localStorage.setItem('token', value);
    }, response.token)

    //const context = await browser.newContext();
    //const page = await context.newPage();


    await page.goto("https://rahulshettyacademy.com/client");


    await page.locator("button[routerlink*='myorders']").click();

    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    console.log(response);
    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (response.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();


    //await page.pause();

});

