const Play = require('../models/Play');
const Card = require('../models/Card');

exports.getPercentComplete = (deckId, userId) => {
  if (!deckId || !userId) {
    return Promise.resolve('0%');
  }

  return Play.distinct('cardId', { deckId, userId })
    .then(distinctCards =>
      Card.find({ deckId })
        .then((allCards) => {
          // no cards? should never happen! empty decks shouldn't be in ui.
          if (!allCards.length) {
            return Promise.resolve('0%');
          }
          const percentage = 100 * (distinctCards.length / allCards.length);
          return `${percentage.toFixed(2)}%`;
        }));
};
