const queryDb = require('./QueryDb');

// helper function to get random numbers
const getRandom = {
  probability: () => Math.random() * 0.5,
  cardIndex: n => Math.floor(Math.random() * n),
  cardId: (deck, cardIndex) => deck[cardIndex]._id,
  trio: (deck) => {
    const cardIndex = getRandom.cardIndex(deck.length);
    return ({
      p: getRandom.probability(),
      cardIndex,
      cardId: getRandom.cardId(deck, cardIndex),
    });
  },
};

// given a deck id, retrieve a card
const getCard = (deckId, userId) => (
  // get the deck
  queryDb().getDeck(deckId).then((deck) => {
    // intitialize random card index and tries
    let tries = 0;
    const maxTries = 10;

    // get a random real number
    let p;
    let cardIndex;
    let cardId;
    ({ p, cardIndex, cardId } = getRandom.trio(deck));

    const findCard = () => (
      // find all plays that match card id
      queryDb().getCardPlays(cardId, deckId, userId).then((plays) => {
        // get total rating for that card
        let totalRating = 0;
        if (plays.length) {
          // we want lower total rating for thumbs up
          totalRating = plays.reduce((sum, play) => sum - Number(play.rating), 0);
        } else {
          return deck[cardIndex];
        }
        // get a random real number based on card's total rating
        const randCardProbability = Math.random() * (totalRating ** 2);

        // decide whether to show card based on the randomly generated numbers
        if (p > randCardProbability && tries < maxTries) {
          ({ p, cardIndex, cardId } = getRandom.trio(deck));
          tries += 1;
          return findCard();
        }
        return deck[cardIndex];
      })
    );

    return findCard();
  })
);

module.exports = getCard;
