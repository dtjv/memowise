const Actor = require('../steps/Custom.js');

let I;

module.exports = {
  _init() {
    I = Actor();
  },

  buttons: {
    flipcard: '.flashcard-buttons button',
    bad: '#btn-bad',
    okay: '#btn-ok',
    great: '#btn-great',
    close: '.flashcard-close i',
  },

  flipCard() {
    I.click({ css: this.buttons.flipcard });
    I.wait(3);
  },

  rateCard(rating) {
    I.click({ css: this.buttons[rating] });
    I.wait(3);
  },

  close() {
    I.click({ css: this.buttons.close });
    I.wait(3);
  },
};
