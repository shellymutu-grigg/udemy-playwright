# Run cucumber: npx cucumber-js

Feature: Validating cucumber integration

  Scenario: Place an order
    Given a user is able to login with "username" and "password"
    When add "ZARA COAT 3" item to cart
    Then verify that "ZARA COAT 3" item is displayed in the cart and place order
    Then validate the order placed successfully and navigate to order history page
    Then verify that the order is present in the order history 