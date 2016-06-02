//import dbquery from './dbaccess.js';
// query the database
const queryDb = () => {
  // given a deck id, get all the cards in that deck
  const getDeck = (deckId) => {
    return Cards.find({ deckId: deckId });
  };

  // given a deck id and user id, get the plays for that deck
  const getDistinctCardsPlays = (deckId, userId) => {
    return Plays.distinct('cardId', {deckId: deck_id}); //, userId: userId });
  };

  const getCardPlays = (cardId, deckId, userId) => {
    return Plays.find({ cardId: cardId, deckId: deckId }); //, userId: userId});
  };

  return ({
    getDeck: getDeck,
    getPlays: getPlays,
    getCardPlays: getCardPlays
  });
};

const getProgress = (deckId) => {
  // input deck is either an id # or a deck object w/ an id property
  // const deck_id = inputDeck._id === undefined ? inputDeck : inputDeck._id;
  return queryDb().getDistinctCardsPlays(deckId, '0')
    .then( distinctCards => {
      console.log('dist cards: ', distinctCards);
      return queryDb().getDeck(deckId).then( allCards => {
        const progress = distinctCards.length / allCards.length;
        console.log(progress);
        return progress;
      });
    });
};

export default getProgress;
