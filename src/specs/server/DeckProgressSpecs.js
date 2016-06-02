import request from 'supertest';
import getCard from '../../server/controllers/deck-progress.js'; 
import app from '../../../dev/server/server.js';
import db from '../../../dev/server/db';
import { expect } from 'chai';
import Cards from '../../../dev/server/models/cards.js';
import Decks from '../../../dev/server/models/decks.js';
import Plays from '../../../dev/server/models/plays.js';

// seed data by running npm run seed before testing deck-progress
describe('', function() {

  describe('deck-progress basics', function () {
    this.timeout(5000);

    // create new plays
    beforeEach( function (done) {
      this.timeout(5000);
      let cardsMade = 0;
      Plays.remove({})
        .then( () => {
          Cards.find({ deckId: '0' })
          .then( cards => {
            // play only some cards
            const n = Math.floor(3*cards.length / 4);
            for (let i = 0; i < n; i++) {
              Plays.create({
                created_at: '5:01',
                rating: '0',
                deckId: '0',
                cardId: cards[i]._id
              }).then( () => {
                cardsMade++ === n - 1 ? done() : null;
              });
            }
          })
        })
    });    

    it('should correctly have an function named `getCard`', () => {
      expect(getCard).to.be.a('function');
    });

    it('should return a random card given a deck id', done => {
      getCard('0').then( function(card) {
        expect(card.deckId).to.equal('0');
        expect(card.question).to.be.ok;
        done();
      });
    });
  });
});

