#!/usr/bin/env node

require('dotenv-safe').load();

const Deck = require('../src/server/models/Deck');
const Card = require('../src/server/models/Card');

const inspectDB = () =>
  Deck.find({})
    .then((decks) => {
      console.log(decks, '<-- decks');

      if (!decks.length) {
        throw new Error('no decks');
      }

      return Card.find({})
        .then((cards) => {
          console.log(cards, '<-- cards');

          if (!cards.length) {
            throw new Error('no cards');
          }
        });
    });

const main = () =>
  inspectDB()
    .then(() => inspectDB());

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
