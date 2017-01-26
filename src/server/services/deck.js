const Play = require('../models/Play');
const Card = require('../models/Card');

exports.getPercentComplete = (deckId, userId) =>
  Play.distinct('cardId', { deckId, userId })
    .then(distinctCards =>
      Card.find({ deckId })
        .then(allCards =>
          `${(100 * Number(distinctCards.length)) / Number(allCards.length)}%`));
