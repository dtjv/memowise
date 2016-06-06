import queryDb from './QueryDb.js';

const getProgress = (deckId, userId) => (
  queryDb().getDistinctCardsPlayed(deckId, userId)
    .then(distinctCards => (
      queryDb().getDeck(deckId).then(allCards => (
        `${(100 * Number(distinctCards.length)) / Number(allCards.length)}%`
      ))
    ))
);

export default getProgress;
