const mongoose = require('mongoose');

const cfg = {
  db: {
    host: 'localhost',
    port: 27017,
    dbName: 'wonky',
  },
};

mongoose.connect(`mongodb://${cfg.db.host}:${cfg.db.port}/${cfg.db.dbName}`);

const GREAT = 1;
const OKAY = 0;
const BAD = -1;

const DeckSchema = new mongoose.Schema(
  { name: String },
  { timestamps: true },
);

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  { timestamps: true },
);

const CardSchema = new mongoose.Schema(
  {
    question: {
      text: String,
    },
    answer: {
      text: String,
      explanation: String,
    },
    deckId: String,
    userId: String,
  },
  { timestamps: true },
);

const PlaySchema = new mongoose.Schema(
  {
    rating: String,
    cardId: String,
    deckId: String,
    userId: String,
  },
  { timestamps: true },
);

const Deck = mongoose.model('Deck', DeckSchema);
const User = mongoose.model('User', UserSchema);
const Card = mongoose.model('Card', CardSchema);
const Play = mongoose.model('Play', PlaySchema);

const decksFixture = [
  { name: 'Deck 1' },
  { name: 'Deck 2' },
];

const usersFixture = [
  { name: 'Test User 1', email: 'testuser1@test.com', password: 'password' },
  { name: 'Test User 2', email: 'testuser2@test.com', password: 'password' },
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

const playsFixture = [
  { userId: '', deckId: '', cardId: '', rating: GREAT },
  { userId: '', deckId: '', cardId: '', rating: OKAY },
  { userId: '', deckId: '', cardId: '', rating: BAD },
];

const linkCardsToDeck = deckId => (
  cardsFixture.map(card => (
    { ...card, deckId }
  ))
);

const insertCards = decks => (
  Card.insertMany(decks.reduce((memo, deck) => (
    [...memo, ...linkCardsToDeck(deck._id)]
  ), []))
);

const linkPlaysToAll = (user, card) => (
  playsFixture.map(play => (
    { ...play, userId: user._id, deckId: card.deckId, cardId: card._id }
  ))
);

const linkPlays = (users, card) => (
  users.reduce((memo, user) => (
    [...memo, ...linkPlaysToAll(user, card)]
  ), [])
);

const insertPlays = (users, cards) => (
  Play.insertMany(cards.reduce((memo, card) => (
    [...memo, ...linkPlays(users, card)]
  ), []))
);

const load = () => (
  Promise
    .all([
      User.remove(),
      Deck.remove(),
      Card.remove(),
      Play.remove(),
    ])
    .then(() => (
      Promise.all([
        User.insertMany(usersFixture),
        Deck.insertMany(decksFixture),
      ])
      .then((data) => {
        const [users, decks] = data;
        return insertCards(decks)
          .then(cards => insertPlays(users, cards));
      })
      .catch(error => error)
    ))
    .catch(error => error)
);

load().then(() => {
  mongoose.disconnect();
});
