import { expect, type Locator, type Page } from '@playwright/test';

let message1: string = "Hello World";
message1 = "Ok";
console.log(message1);

let age: number = 20;
console.log(age);

let isActive: boolean = true;
console.log(isActive);

let numbers1: number[] = [1, 2, 3];
console.log(numbers1);

//below 'any' will take any data type like javascript
let data: any = "Hi";
console.log(data);
data = 35;
console.log(data);
data = 5.2;
console.log(data);


function add1(a: number, b: number): number {
    return a + b;
}

//let sum:number = add(3,4)

console.log(add1(3, 4));


let user: { name: string, age: number, location: string } = { name: "Bob", age: 24, location: "Hyd" };
user.location = "Hyd";

class CartPage {

    page: Page;
    firstElement : Locator;
    checkoutButton : Locator;

    constructor(page:any) {
        this.page = page;
        this.firstElement = page.locator("div li");
        this.checkoutButton = page.locator("button:has-text('Checkout')");
    }

}