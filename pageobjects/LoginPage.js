class LoginPage {

    constructor(page) {
        this.page = page;
        this.signInbutton = page.locator(".login-btn");
        this.userEmail = page.locator("#userEmail");
        this.userPassword = page.locator("[formcontrolname='userPassword']");
    }

    async goTo()
    {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }


    async validLogin(userName, password) {
        await this.userEmail.fill(userName);
        await this.userPassword.fill(password);
        await this.signInbutton.click();
    }
}

module.exports = { LoginPage };