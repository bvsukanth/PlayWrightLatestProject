const {test, expect} = require('@playwright/test');

test.only('Browser context test',async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();

    const userName = page.locator('#username');
    const signInBtn = page.locator(".btn-md");
    const cardTitles = page.locator(".card-title a");

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await userName.fill('rahulshetty'); // Id -> tagname#Id or #Id 
    await page.locator("[name='password']").fill('Learning@830$3mK2'); // Css based on attribute -> [attribute='value'] 
    await signInBtn.click(); // Class -> tagname.class or .class
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect username/password.");
    await userName.fill('rahulshettyacademy'); // Id -> tagname#Id or #Id 
    await signInBtn.click(); // Class -> tagname.class or .class
    console.log(await cardTitles.nth(1).textContent());
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.allTextContents());
    console.log("Hi");
});

test('Page fixture test',async ({browser, page})=>
{
    //when you just need default context and page, send page as fixture in function
    //const context = await browser.newContext();
    //const page = await context.newPage();
    await page.goto('https://google.com');
    console.log(await page.title());
    await expect(page).toHaveTitle('Google');
});