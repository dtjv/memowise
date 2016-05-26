Feature: Manage Deck
  As a content creator
  I want to be able to contribute to new and existing decks
  So that new content will become available

  Scenario: Add a deck
    Given I am have a deck markdown file
    When I use the import tool
    Then I should see the new deck on the dashboard
