Feature: Personal Review Deck
  As a user
  I want to be able to play cards that I have had trouble with previously
  So that I can focus on problem areas

  Scenario: Show a review deck
    Given I have more than 10 cards with a weak score
    When I go to the dashboard
    Then I should see the my review deck
