// query the database
const queryDb = (id, queryString) => {
  // placeholders until database implemented
  const queryAction = {
    getDeck: () => [{cards: []}],
    getPlays: () => [{rating: 0, deckId: 0, cardId: 0}]
  }
  return queryAction[queryString]();
};

// given a deck, retrieve a card
// for testing: can pass in dummy deck and dummy plays or use the default ones
const getCard = (inputDeck, inputPlays) => {
  // get dummy deck
  let deck;
  let plays;

  if (inputPlays)
    plays = inputPlays;

  if (typeof inputDeck === 'object') {
    deck = inputDeck;
  } else {
    // if inputDeck is an id number
    // must make these asyncronous
    deck = queryDb(inputDeck, 'getDeck');
    // get the plays that belong to the deck
    plays = queryDb(inputDeck, 'getPlays'); 
  }


  // intitialize random card indexc and tries
  let randCardIndex = 0;
  let tries = 0;
  const maxTries = 10;

  // get a random card's index based on history of plays
  // can make this into an async function
  while (tries < maxTries) {
    // get a random real number between 0 and 0.5
    let randProbability = Math.random() * 0.5;
    // get a random card's index from the deck
    let randCardIndex = Math.floor(Math.random() * deck.cards.length);
    
    // find all plays that match card id
    let cardPlays = plays.map(card => card.cardId === randCardIndex);
    // get card's total rating
    let totalRating = cardPlays.reduce((total, card) => total + card.rating, 0);
    // get a random real number based on card's total rating
    let randCardProbability = Math.random() * Math.pow(2, totalRating);
    
    // decide whether to show card based on the randomly generated numbers
    if (randProbability < randCardProbability)
      tries = maxTries;  // will break out of while loop

    tries++;
  }
  return deck.cards[randCardIndex];
}; 

export default getCard;












