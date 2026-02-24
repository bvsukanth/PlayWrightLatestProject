const {test, expect, request} = require('@playwright/test');
const loginPayload = {userEmail:"Tester@2223.com",userPassword:"Test@123"};
const orderpayLoad = {orders:[{country:"Cuba",productOrderedId:"6960eac0c941646b7a8b3e68"}]};
let token;
let orderId;
const {APIUtils} = require('./utils/APIUtils');
let response;
const fakePayloadOrders = {data:[], message:"No Orders"};

test.beforeAll(async ()=>{
    
   
    //Login API
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderpayLoad);
    

   
});

test.beforeEach(()=>{



});

test('Place order',async ({browser, page})=>
{
    
    

    page.addInitScript(value => {

        window.localStorage.setItem('token', value);
    }, response.token)

    //const context = await browser.newContext();
    //const page = await context.newPage();


    await page.goto("https://rahulshettyacademy.com/client");
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route=>
    {
        const response = await page.request.fetch(route.request());
        let body = JSON.stringify(fakePayloadOrders);
        route.fulfill(
            {
                response,
                body
            }
        );
    });
   

    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route=> route.continue({})
    );
    console.log(await page.locator(".mt-4").textContent());

   
   
});

