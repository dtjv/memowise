#!/usr/bin/env node

/* eslint-disable no-console */

const meow = require('meow');
const fs = require('fs');
const { join, resolve } = require('path');
const MongoClient = require('mongodb').MongoClient;
const cfg = require('../src/server/config');

cfg.db.url = `mongodb://${cfg.db.host}:${cfg.db.port}/${cfg.db.dbName}`;

const help = `
  Usage:')}
    deck-import [<options>]

  Options:
    --help     Prints usage
    -a         Import all decks (default)
    -f <file>  Import only deck <file>

  Examples:
    $ deck-import -a
    $ deck-import -f math.md
  \n
`;

const makeFileList = (opts = {}) => {
  const basePath = resolve(__dirname, '../docs/decks');
  return opts.f
    ? [join(`${basePath}`, opts.f)]
    : fs.readdirSync(basePath).map(fn => join(`${basePath}`, fn));
};

/*
 * Returns a deck object of the form:
 *
 * {
 *   name: '',
 *   cards: [
 *     {
 *       question: {
 *         text: ''
 *       },
 *       answer: {
 *         text: '',
 *         explanation: '',
 *       },
 *     },
 *   ]
 * }
 */
const parseMarkdownFile = (file) => {
  const deck = {};
  const cards = [];

  // parse the file for deck name
  const title = file.match(/^# (.+)/);

  if (title) {
    deck.name = title[1];
  } else {
    throw new Error('No deck title!');
  }

  // parse the file for cards
  let s = file.indexOf('## Card');
  let f = file.indexOf('---');

  while (s !== -1 && f !== -1) {
    cards.push(file.slice(s, f));
    s = file.indexOf('## Card', s + 1);
    f = file.indexOf('---', f + 1);
  }

  if (!cards.length) {
    throw new Error('No cards for deck!');
  }

  // parse each card for question, answer and explanation
  deck.cards = cards.map((card) => {
    const c = card.slice(card.indexOf('###'));
    const q = c.indexOf('### Question');
    const a = c.indexOf('### Answer');
    const e = c.indexOf('### Explanation');

    if (q === -1 || q === -1 || e === -1) {
      throw new Error('Missing required card sections!');
    }

    return {
      question: {
        text: c.slice(q + '### Question'.length, a).trim(),
      },
      answer: {
        text: c.slice(a + '### Answer'.length, e).trim(),
        explanation: c.slice(e + '### Explanation'.length).trim(),
      },
    };
  });

  return deck;
};

const insertDeckIntoDB = (db, { name, cards }) => {
  const deck = { name };

  return db.collection('decks').insert(deck)
    .then(() => {
      // the insert modifies our object, `deck`, by adding an `_id`!!
      const deckId = deck._id.toString();
      return db
        .collection('cards')
        .insert(cards.map(card => Object.assign({}, card, { deckId })));
    });
};

const insertDecksIntoDB = (db, decks) =>
  Promise.all(decks.map(deck => insertDeckIntoDB(db, deck)));

const main = () => {
  const cli = meow({ help });
  const markdownFiles = makeFileList(cli.flags);

  const decks = markdownFiles
    .map(fn => fs.readFileSync(fn, 'utf8'))
    .map(parseMarkdownFile);

  MongoClient.connect(cfg.db.url).then((db) => {
    db.collections().then((collections) => {
      collections.forEach((collection) => {
        if (collection.collectionName !== 'system.indexes') {
          collection.drop();
        }
      });

      insertDecksIntoDB(db, decks).then((result) => {
        decks.forEach(({ name }, idx) =>
          console.log(`Added ${name} + ${result[idx].insertedCount} cards`));
        db.close();
      });
    });
  })
  .catch(err => console.error(err));
};

main();
