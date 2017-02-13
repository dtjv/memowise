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
    I.wait();
    I.signUp(name, email, password);
    I.wait();
  },

  chooseDeck() {
    I.click({ css: this.decks.first });
    I.wait();
  },
};
