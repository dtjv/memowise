/* eslint-disable global-require, no-unused-vars */

let I;
let dashboardPage;
let flashcardFragment;

module.exports = {
  _init() {
    I = require('../steps/Custom.js')();
    dashboardPage = require('../pages/Dashboard');
    flashcardFragment = require('../fragments/Flashcard');
  },

  study() {
    dashboardPage.chooseDeck();
    flashcardFragment.flipCard();
  },
};
