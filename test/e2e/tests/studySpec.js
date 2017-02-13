/* global Feature, Before, Scenario, AfterSuite */

const { emptyUsersCollection } = require('../libs/collections');
const user = require('../fixtures/user.json');

Feature('Study');

Before((dashboardPage) => {
  emptyUsersCollection().then(() => {
    dashboardPage.load(user);
  });
});

AfterSuite(() => {
  emptyUsersCollection();
});

Scenario('Flip Card', (I, studyStep) => {
  studyStep.study();
  I.see('How well did you do?');
  I.seeNumberOfElements('button', 3);
});

Scenario('Cancel Study Session', (I, studyStep, flashcardFragment) => {
  studyStep.study();
  flashcardFragment.close();
  I.seeInCurrentUrl('/dashboard');
});

Scenario('Rate Performance Okay', (I, studyStep, flashcardFragment) => {
  studyStep.study();
  flashcardFragment.rateCard('okay');
  I.seeInCurrentUrl('/decks/');
  I.seeInCurrentUrl('/study');
});

Scenario('Rate Performance Great', (I, studyStep, flashcardFragment) => {
  studyStep.study();
  flashcardFragment.rateCard('great');
  I.seeInCurrentUrl('/decks/');
  I.seeInCurrentUrl('/study');
});

Scenario('Rate Performance Bad', (I, studyStep, flashcardFragment) => {
  studyStep.study();
  flashcardFragment.rateCard('bad');
  I.seeInCurrentUrl('/decks/');
  I.seeInCurrentUrl('/study');
});

Scenario('See Study Progress', (I, studyStep, flashcardFragment) => {
  studyStep.study();
  flashcardFragment.rateCard('great');
  flashcardFragment.close();
  I.see('Last Studied: Today');
});
