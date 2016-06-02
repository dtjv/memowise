import getCard from '../../server/controllers/deck-progress.js';
import getProgress from '../../server/controllers/progress-bar.js';
import { expect } from 'chai';
import Cards from '../../../dev/server/models/cards.js';
import Plays from '../../../dev/server/models/plays.js';
/* global describe, it, before, beforeEach, after, afterEach */
/* eslint-disable func-names, prefer-arrow-callback */

// seed data by running npm run seed before testing deck-progress
describe('deck-progress', function () {
  describe('deck-progress basics', function () {
    this.timeout(5000);

    // create new plays
    beforeEach(function (done) {
      let cardsMade = 0;
      Plays.remove({})
        .then(() => {
          Cards.find({ deckId: '0' })
          .then(cards => {
            // play only some cards
            const n = Math.floor(3 * cards.length / 4);
            const createPlays = () => {
              Plays.create({
                created_at: '5:01',
                rating: '0',
                deckId: '0',
                cardId: cards[cardsMade]._id,
                userId: '0',
              }).then(() => {
                const action = cardsMade++ === n - 1 ? done : createPlays;
                action();
              });
            };
            createPlays();
          });
        });
    });

    it('should correctly have an function named `getCard`', () => {
      expect(getCard).to.be.a('function');
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
    let calcPerc = 0;
    beforeEach(function (done) {
      this.timeout(5000);
      let cardsMade = 0;
      Plays.remove({})
        .then(() => {
          Cards.find({ deckId: '0' })
          .then(cards => {
            const n = Math.floor(3 * cards.length / 4);
            const numSeenCards = 4;
            let j = 0;
            const createPlays = () => {
              Plays.create({
                created_at: '5:01',
                rating: '0',
                deckId: '0',
                cardId: cards[j]._id,
                userId: '0',
              }).then(() => {
                j = Math.floor(cardsMade % numSeenCards);
                calcPerc = numSeenCards / cards.length;
                if (cardsMade++ === n - 1) {
                  done();
                }
                createPlays();
              });
            };
            createPlays();
          });
        });
    });

    it('should correctly have an function named `getProgress`', () => {
      expect(getProgress).to.be.a('function');
    });

    it('should return the percentage of distinct cards seen', done => {
      getProgress('0').then(function (perc) {
        expect(perc).to.equal(calcPerc);
        done();
      });
    });
  });
});

