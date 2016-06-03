import queryDb from './query-db.js';

const getProgress = deckId => (
  queryDb().getDistinctCardsPlayed(deckId, '0')
    .then(distinctCards => (
      queryDb().getDeck(deckId).then(allCards => (
        distinctCards.length / allCards.length
      ))
    ))
);

export default getProgress;
