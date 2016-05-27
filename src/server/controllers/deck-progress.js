
const dummyDecks = [
  { objId: 1,
    created_at: '5:00',
    name: "JS",
    cards: [
      {
        question: 'Who?',
        answer: {
          text: 'Something or other',
          explanation: 'Another thing'
        }
      },
      {
        question: 'What?',
        answer: {
          text: 'Someone or other',
          explanation: 'Another one'
        }
      }
  ]},
  { objId: 2,
    created_at: '5:00',
    name: "Angular",
    cards: [
      {
        question: 'Who?',
        answer: {
          text: 'Something or other',
          explanation: 'Another thing'
        }
      },
      {
        question: 'What?',
        answer: {
          text: 'Someone or other',
          explanation: 'Another one'
        }
      }]
  }];

const dummyPlays = [
  { objId: 1,
    created_at: '5:01',
    rating: 1,
    deck_id: 1,
    card_id: 0 
  },
  { objId: 2,
    created_at: '5:02',
    rating: 1,
    deck_id: 1,
    card_id: 0 
  },
  { objId: 3,
    created_at: '5:03',
    rating: 1,
    deck_id: 1,
    card_id: 1 
  }];


// query the database
const queryDb = (id, queryString) => {
  const queryAction = {
    getDeck: () => dummyDecks[id];
    getPlays: () => dummyPlays;  // get plays that match id
  }
};

// given a deck, retrieve a card
const getCard = deck_id => {
  // must make these asyncronous
  const deck = queryDb(deck_id, 'getDeck');
  // get the plays that belong to the deck
  let plays = queryDb(deck_id, 'getPlays');
  // default: get any random card's index (changed below)
  let rand_card_index = Math.floor(Math.random() * deck.cards.length);

  let tries = 0;
  const max_tries = 10;

  // get a random card's index based on history of plays
  // can make this into an async function
  while (tries < max_tries) {
    // get a random real number between 0 and 0.5
    let rand_probability = Math.random() * 0.5;
    // get a random card's index from the deck
    let rand_card_index = Math.floor(Math.random() * deck.cards.length);
    
    // find all plays that match card id
    let card_plays = plays.map(card => card.card_id === rand_card_index);
    // get card's total rating
    let total_rating = card_plays.reduce((total, card) => total + card.rating, 0);
    // get a random real number based on card's total rating
    let rand_card_probability = Math.random() * Math.pow(2, total_rating);
    
    // decide whether to show card based on the randomly generated numbers
    if (rand_probability < random_card_probability)
      tries = max_tries;  // will break out of while loop

    tries++;
  }

  return deck[rand_card_index];
}; 





















