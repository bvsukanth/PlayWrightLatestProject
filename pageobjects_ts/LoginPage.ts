import { test, expect, Locator, Page } from '@playwright/test';

export class LoginPage {

    signInbutton : Locator;
    userEmail : Locator;
    userPassword : Locator;
    page : Page;

    constructor(page: Page) {
        this.page = page;
        this.signInbutton = page.locator(".login-btn");
        this.userEmail = page.locator("#userEmail");
        this.userPassword = page.locator("[formcontrolname='userPassword']");
    }

    async goTo()
    {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }


    async validLogin(userName: string, password: string) {
        await this.userEmail.fill(userName);
        await this.userPassword.fill(password);
        await this.signInbutton.click();
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = { LoginPage };