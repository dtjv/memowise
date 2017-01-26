const MongoClient = require('mongodb').MongoClient;

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


exports.importDecks = (decks, dbUrl) =>
  MongoClient.connect(dbUrl).then(db =>
      db.collections().then((collections) => {
        collections.forEach((collection) => {
          if (collection.collectionName !== 'system.indexes') {
            collection.drop();
          }
        });

        return insertDecksIntoDB(db, decks).then((result) => {
          db.close();
          return result;
        });
      }));

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
exports.parseMarkdownFile = (file) => {
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
      throw new Error('Missing required card section(s)!');
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
