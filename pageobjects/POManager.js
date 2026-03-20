const { LoginPage } = require('./LoginPage');
const { DashBoardpage } = require('./DashBoardpage');
const { CartPage } = require('./CartPage');
const { CheckoutPage } = require('./CheckoutPage');
const { ThankyouPage } = require('./ThankyouPage');
const {OrdersHistoryPage} = require('./OrdersHistoryPage');


class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashBoardpage(this.page);
        this.cartPage = new CartPage(this.page);
        this.checkoutPage = new CheckoutPage(this.page);
        this.thankyouPage = new ThankyouPage(this.page);
        this.ordershistoryPage = new OrdersHistoryPage(this.page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashBoardPage() {
        return this.dashboardPage;
    }

    getcartPage() {
        return this.cartPage;
    }

    getcheckOutPage() {
        return this.checkoutPage;
    }

     getthankyouPage() {
        return this.thankyouPage;
    }

    getordersHistoryPage() {
        return this.ordershistoryPage;
    }
}


module.exports = { POManager };