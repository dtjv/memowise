/* global Feature, Before, Scenario AfterSuite */

const { emptyUsersCollection } = require('../libs/collections');
const user = require('../fixtures/user.json');

Feature('Dashboard');

Before((dashboardPage) => {
  emptyUsersCollection().then(() => {
    dashboardPage.load(user);
  });
});

AfterSuite(() => {
  emptyUsersCollection();
});

Scenario.only('/dashboard', (I) => {
  I.see('Math');
  I.see('Git Command Line');
  I.see('Sublime Text Shortcuts');
  I.see('STUDY');
  I.seeInCurrentUrl('/dashboard');
});

Scenario('Study First Deck', (I, dashboardPage) => {
  I.click({ css: dashboardPage.decks.first });
  I.see('FLIP CARD');
  I.seeInCurrentUrl('/decks/');
  I.seeInCurrentUrl('/study');
});

