const Actor = require('../steps/Custom.js');

let I;

module.exports = {
  _init() {
    I = Actor();
  },

  decks: {
    first: '#deck0',
  },

  load({ name, email, password }) {
    I.amOnPage('/');
    I.click('#menu-signup');
    I.wait(3);
    I.signUp(name, email, password);
    I.wait(3);
  },

  chooseDeck() {
    I.click({ css: this.decks.first });
    I.wait(3);
  },
};
