import { LoginPage } from './LoginPage';
import { DashBoardpage } from './DashBoardpage';
import { CartPage } from './CartPage';
import { CheckoutPage } from './CheckoutPage';
import { ThankyouPage } from './ThankyouPage';
import { OrdersHistoryPage } from './OrdersHistoryPage';
import { Page } from '@playwright/test';


export class POManager {

    loginPage: LoginPage;
    dashboardPage: DashBoardpage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
    thankyouPage: ThankyouPage;
    ordershistoryPage: OrdersHistoryPage;
    page: Page;
    constructor(page: Page) {
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