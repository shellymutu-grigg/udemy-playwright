Feature: Validating cucumber integration

  Scenario: Place an order
    Given a user is able to login with "username" and "password"
    When add "ZARA COAT 3" item to cart
    Then verify that "ZARA COAT 3" item is displayed in the cart
    Then enter valid order details and place the order
    Then verify that the order is present in the order history 