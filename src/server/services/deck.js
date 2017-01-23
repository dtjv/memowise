const { getCardsInDeck } = require('./card');
const { getDistinctCardsPlayed } = require('./play');

exports.getPercentComplete = (deckId, userId) =>
  getDistinctCardsPlayed(deckId, userId)
    .then(distinctCards =>
      getCardsInDeck(deckId)
        .then(cards =>
          `${(100 * Number(distinctCards.length)) / Number(cards.length)}%`));
