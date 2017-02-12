/* global Feature, Before, Scenario */

const { emptyUsersCollection } = require('../libs/collections');
const user = require('../fixtures/user.json');

Feature('SignIn');

Before(() => {
  emptyUsersCollection();
});

Scenario('/sign-in', (I) => {
  I.amOnPage('/sign-in');
  I.see('Sign In', { css: 'h1' });
  I.seeElement('#email');
  I.seeElement('#password');
  I.seeElement('button');
  I.see('SIGN IN', { name: 'submit' });
});

Scenario('Submit Valid Credentials', (I) => {
  I.amOnPage('/sign-up');
  I.signUp(user.name, user.email, user.password);
  I.wait(3);
  I.click('Sign Out');
  I.wait(3);
  I.click('Sign In');
  I.signIn(user.email, user.password);
  I.wait(3);
  I.see(user.name);
  I.see('Sign Out');
  I.seeInCurrentUrl('/dashboard');
});

Scenario('Submit Invalid Credentials', (I) => {
  I.amOnPage('/sign-in');
  I.signIn(user.email, user.password);
  I.see('Invalid credential.');
  I.seeInCurrentUrl('/sign-in');
});
