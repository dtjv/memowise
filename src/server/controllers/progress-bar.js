import Cards from '../../../dev/server/models/cards.js';
import Plays from '../../../dev/server/models/plays.js';

// import dbquery from './dbaccess.js';
// query the database
const queryDb = () => {
  // given a deck id, get all the cards in that deck
  const getDeck = deckId => Cards.find({ deckId });

  // userId is currently set to '0' until we can obtain it globally or from a session
  // given a deck id and user id, get the plays for that deck
  const getDistinctCardsPlayed = (deckId, userId) => (
    Plays.distinct('cardId', { deckId, userId: '0' })
  );
  // userId is currently set to '0' until we can obtain it globally or from a session
  const getCardPlays = (cardId, deckId, userId) => (
    Plays.find({ cardId, deckId, userId: '0' })
  );

  return ({
    getDeck,
    getDistinctCardsPlayed,
    getCardPlays,
  });
};

const getProgress = deckId => (
  queryDb().getDistinctCardsPlayed(deckId, '0')
    .then(distinctCards => (
      queryDb().getDeck(deckId).then(allCards => {
        const progress = distinctCards.length / allCards.length;
        return progress;
      })
    ))
);

export default getProgress;
