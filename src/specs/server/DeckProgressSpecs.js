import getCard from '../../server/controllers/deck-progress.js';
import getProgress from '../../server/controllers/progress-bar.js';
import { expect } from 'chai';
import Cards from '../../server/models/cards.js';
import Plays from '../../server/models/plays.js';
/* global describe, it, before, beforeEach, after, afterEach */
/* eslint-disable func-names, prefer-arrow-callback */

const createCards = () => {
  const allCards = [];
  for (let i = 0; i < 10; i++) {
    const dummy = i.toString();
    allCards.push({
      question: { text: dummy },
      answer: { text: dummy, explanation: ' ' },
      deckId: '0',
    });
  }
  return allCards;
};

const createPlays = (cards, n) => {
  const allPlays = [];
  for (let i = 0; i < n; i++) {
    allPlays.push({
      rating: '0',
      deckId: '0',
      cardId: cards[i]._id,
      userId: '0',
    });
  }
  return allPlays;
};

const calcPerc = (deck, n) => n / deck.length;
let realPerc = 0;

// seed data by running npm run seed before testing deck-progress
describe('deck-progress', function () {
  this.timeout(5000);

  before(function (done) {
    const allCards = createCards();
    const n = 5;
    let allPlays = [];
    Cards.remove({})
      .then(() => (
        Cards.create(allCards)
      ))
      .then(cards => (
        Plays.remove({})
          .then(() => {
            allPlays = createPlays(cards, n);
            realPerc = calcPerc(cards, n);
            return Plays.create(allPlays);
          })
          .then(() => {
            done();
          })
      ));
  });

  describe('deck-progress basics', function () {
    it('should correctly have an function named `getCard`', done => {
      expect(getCard).to.be.a('function');
      done();
    });

    it('should return a random card given a deck id', done => {
      getCard('0').then(function (card) {
        expect(card.deckId).to.equal('0');
        expect(card.question).to.not.equal(undefined);
        done();
      });
    });
  });

  describe('progress-bar basics', function () {
    // create new plays with only some cards
    it('should correctly have an function named `getProgress`', done => {
      expect(getProgress).to.be.a('function');
      done();
    });

    it('should return the percentage of distinct cards seen', done => {
      getProgress('0').then(function (perc) {
        expect(perc).to.equal(realPerc);
        done();
      });
    });
  });
});

