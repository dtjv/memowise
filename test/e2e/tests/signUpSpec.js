/* global Feature, Before, Scenario, AfterSuite */

const { emptyUsersCollection } = require('../libs/collections');
const user = require('../fixtures/user.json');

Feature('SignUp');

Before((I) => {
  emptyUsersCollection().then(() => {
    I.amOnPage('/sign-up');
  });
});

AfterSuite(() => {
  emptyUsersCollection();
});

Scenario('/sign-up', (I) => {
  I.see('Create Account', { css: 'h1' });
  I.seeElement('#username');
  I.seeElement('#email');
  I.seeElement('#password');
  I.seeElement('button');
  I.see('CREATE ACCOUNT');
});

Scenario('Submit Valid Credentials', (I) => {
  I.signUp(user.name, user.email, user.password);
  I.wait(3);
  I.see(user.name);
  I.see('Sign Out');
  I.seeInCurrentUrl('/dashboard');
});

Scenario('Submit Invalid Credentials', (I) => {
  I.signUp(user.name, user.email, user.password);
  I.wait(3);
  I.click({ id: 'menu-signout' });
  I.wait(3);
  I.click({ id: 'menu-signup' });
  I.signUp(user.name, user.email, user.password);
  I.see('Email already exists.');
  I.seeInCurrentUrl('/sign-up');
});

