const {test, expect} = require('@playwright/test');

test('Browser context test',async ({browser})=>
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
    
    console.log(await cardTitles.allTextContents());//once array is returned, it will print zero elements in array. Having cardTitles.nth(1).textContent()
    //or cardTitles.first().textContent() will only give result with all elements 
   
});

test('Page fixture test',async ({browser, page})=>
{
    //when you just need default context and page, send page as fixture in function
    //const context = await browser.newContext();
    //const page = await context.newPage();
    await page.goto('https://google.com');
    console.log(await page.title());
    await expect(page).toHaveTitle('Google');//ok
});

test.only('UI Controls',async ({browser, page})=>
{

    //Dropdown using SelectOption, Radio buttons and Checkbox - Assertions for Radio buttons and Checkbox
    
    const userName = page.locator('#username');
    const signInBtn = page.locator(".btn-md");
    const dropDown = page.locator("select.form-control");

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await userName.fill('rahulshetty'); // Id -> tagname#Id or #Id 
    await page.locator("[name='password']").fill('Learning@830$3mK2'); // Css based on attribute -> [attribute='value'] 
    await dropDown.selectOption('consult');
    //await page.pause();

    //Radio buttons
    await page.locator(".radiotextsty").nth(1).click();
    await page.locator("#okayBtn").click();
    await expect(page.locator(".radiotextsty").nth(1)).toBeChecked();
    //await page.pause();

    //Checkbox
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();

    await expect(page.locator("[href*='documents-request']")).toHaveAttribute("class","blinkingText");


});
