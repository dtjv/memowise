const queryDb = require('./QueryDb');

const getProgress = (deckId, userId) => (
  queryDb().getDistinctCardsPlayed(deckId, userId)
    .then(distinctCards => (
      queryDb().getDeck(deckId).then(allCards => (
        `${(100 * Number(distinctCards.length)) / Number(allCards.length)}%`
      ))
    ))
);

module.exports = getProgress;
