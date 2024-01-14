# Run cucumber: npx cucumber-js features/cucumber-tags.feature --exit
# Run cumcumber tests with tags: npx cucumber-js --tags "@error"  --exit 
# Run sceanarios in feature file in parallel: npx cucumber-js features/cucumber-tags.feature --parallel 2 --exit
# Run and generate report: npx cucumber-js features/cucumber-tags.feature --parallel 2 --exit --format html:./features/cucumber-report.html
# Use retry: px cucumber-js --tags "@error" --retry 1 --exit --format html:./features/cucumber-report.html

Feature: Validating cucumber tags
  @error
  Scenario: Validate error message on failed login
    Given a user is tries to login with invalid "<username>" and "<password>"
    Then verify the error message is displayed

  Examples:
      | username | password |
      | test     | test123  |

  @validation
  Scenario Outline: Place an order
    Given a user is able to login with username and password
    When add "<productName>" item to cart
    Then verify that "<productName>" item is displayed in the cart and place order
    Then validate the order for username has been placed successfully and navigate to order history page
    Then verify that the order is present in the order history 

  Examples:
      | productName     |
      | ZARA COAT 3     |
      | ADIDAS ORIGINAL |