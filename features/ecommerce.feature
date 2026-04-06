Feature: All ecommerce validations

Scenario: Placing the Order
Given a login to ecomm application with "Tester@2223.com" and  "Test@123"
When Add "zara coat 3" to cart 
Then Verify "zara coat 3" is displayed in cart
When Enter valid details and place the order
Then Verify order is present in orderhistory  
