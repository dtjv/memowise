const Play = require('../models/Play');

exports.getPlaysByCard = (deckId, cardId, userId) =>
  Play.find({ deckId, cardId, userId });

exports.getDistinctCardsPlayed = (deckId, userId) =>
  Play.distinct('cardId', { deckId, userId });
