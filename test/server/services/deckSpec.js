import { expect } from 'chai';
import range from 'lodash.range';
import {
  getPercentComplete,
} from 'server/services/deck';
import Deck from 'server/models/Deck';
import Card from 'server/models/Card';
import Play from 'server/models/Play';
import { OKAY } from 'client/constants/play';

const resetDB = () =>
  Deck.remove({})
    .then(() => Card.remove({}))
    .then(() => Play.remove({}));

const createDecks = numDecks =>
  range(numDecks).map(num =>
    ({
      name: `Deck ${num}`,
    }));

const createCards = (deck, numCards) =>
  range(numCards).map(num =>
    ({
      deckId: deck._id.toString(),
      question: {
        text: `${num}`,
      },
      answer: {
        text: `${num}`,
        explanation: `${num}`,
      },
    }));

const createPlays = (card, numPlays) =>
  range(numPlays).map(() =>
    ({
      deckId: card.deckId,
      cardId: card._id.toString(),
      userId: '0',
      rating: OKAY,
    }));

const importIntoDB = () =>
  resetDB()
    .then(() => {
      const decks = createDecks(1);
      return Deck.create(decks)
        .then((savedDecks) => {
          const cards = savedDecks.reduce((memo, deck) =>
            ([...memo, ...createCards(deck, 4)]), []);
          return Card.create(cards)
            .then((savedCards) => {
              const plays = savedCards.slice(2).reduce((memo, card) =>
                ([...memo, ...createPlays(card, 4)]), []);
              return Play.create(plays)
                .then(savedPlays => ({ savedDecks, savedCards, savedPlays }));
            });
        });
    });


describe('Deck Services', () => {
  describe('getPercentComplete', () => {
    it('should be a function', () => {
      expect(getPercentComplete).to.be.a('function');
    });

    it('should return percent of cards studied in deck', (done) => {
      importIntoDB()
        .then((result) => {
          const { savedDecks } = result;
          const deckId = savedDecks[0]._id.toString();
          const userId = '0';
          const expected = '50.00%';

          getPercentComplete(deckId, userId)
            .then((percentage) => {
              expect(percentage).to.equal(expected);
              done();
            })
            .catch(err => done(err));
        })
        .catch(error => done(error));
    });
  });
});
