# Run cucumber: npx cucumber-js --exit

Feature: Validating cucumber integration
  @validation
  Scenario: Place an order
    Given a user is able to login with username and password
    When add "<productName>" item to cart
    Then verify that "<productName>" item is displayed in the cart and place order
    Then validate the order for username has been placed successfully and navigate to order history page
    Then verify that the order is present in the order history 

  Examples:
      | productName  |
      | ZARA COAT 3  |