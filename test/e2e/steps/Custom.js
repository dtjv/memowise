/* global actor */

module.exports = () =>
  actor({
    signIn(email, password) {
      this.fillField({ id: 'email' }, email);
      this.fillField({ id: 'password' }, password);
      this.click({ name: 'submit' });
    },

    signUp(username, email, password) {
      this.fillField({ id: 'username' }, username);
      this.fillField({ id: 'email' }, email);
      this.fillField({ id: 'password' }, password);
      this.click({ name: 'submit' });
    },
  });
