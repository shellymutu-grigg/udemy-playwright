# Run cucumber: npx cucumber-js features/cucumber-tags.feature --exit
# Run cumcumber tests with tags: npx cucumber-js --tags "@error"  --exit 

Feature: Validating cucumber tags
    @error
  Scenario: Validate error message on failed login
    Given a user is tries to login with invalid "<username>" and "<password>"
    Then verify the error message is displayed

  Examples:
      | username | password |
      | test     | test123  |