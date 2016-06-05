// setup up fixtures for test (seed db with fake data)
// allows us to tear down db each time during testing
// for atomic integration tests testing

// import db from '../src/server/db';
import Deck  from '../src/server/models/decks';
import Card from '../src/server/models/cards';
// import Play from '../src/server/models/plays';
// import User from '../src/server/models/user';

const decksFixture = [
  { name: 'Deck 1' },
  { name: 'Deck 2' },
];

const cardsFixture = [
  {
    deckId: '',
    question: {
      text: 'Question 1?',
    },
    answer: {
      text: 'Answer 1',
      explanation: 'Explanation 1',
    },
  },
  {
    deckId: '',
    question: {
      text: 'Question 2?',
    },
    answer: {
      text: 'Answer 2',
      explanation: 'Explanation 2',
    },
  },
];

// const usersFixture = [
//   { name: 'Tester 1', email: 'tester1@example.com', password: 'password' },
//   { name: 'Tester 2', email: 'tester2@example.com', password: 'password' },
// ];

// const playsFixture = [
//   { side: 0, deckId: '', cardId: '', userId: '', rating: null },
//   { side: 0, deckId: '', cardId: '', userId: '', rating: null },
//   { side: 0, deckId: '', cardId: '', userId: '', rating: null },
// ];

export const setDeckFK = (deckId) => (
  cardsFixture.map(cardFixture => (
    { ...cardFixture, deckId }
  ))
);

export const loadDecks = () => (
  Deck.remove({})
    .then(() => (
      Deck.create(decksFixture)
    ))
);

export const loadCards = () => (
  Card.remove({})
    .then(() => (
      Deck.find({})
        .then(decks => {
          let cards = [];
          decks.forEach(deck => {
            cards = [...cards, ...setDeckFK(deck._id)];
          });
          console.log(cards);
          return Card.create(cards);
        })
    ))
);

// loads decks!
// export const load = () => (
//   Deck.remove({})
//     .then(() => (
//       Deck.create(decksFixture)
//     ))
// );

