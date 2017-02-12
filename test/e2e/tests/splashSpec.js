/* global Feature, Before, Scenario */

Feature('Splash');

Before((I) => {
  I.amOnPage('/');
});

Scenario('/', (I) => {
  I.see('MemoWise');
  I.see('Sign In');
  I.see('Create Account');
  I.see('STUDY NOW!');
});

Scenario('Click "Sign In"', (I) => {
  I.click('#menu-signin');
  I.seeInCurrentUrl('/sign-in');
});

Scenario('Click "Create Account"', (I) => {
  I.click('#menu-signup');
  I.seeInCurrentUrl('/sign-up');
});

Scenario('Click "STUDY NOW!"', (I) => {
  I.click('#cta');
  I.seeInCurrentUrl('/sign-in');
});
