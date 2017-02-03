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
          if (collection.collectionName === 'decks' ||
              collection.collectionName === 'cards') {
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
exports.parseMarkdownFile = ({ fn, content }) => {
  const deck = {};
  const cards = [];

  // parse the file contents for deck name
  const title = content.match(/^# (.+)/);

  if (title) {
    deck.name = title[1];
  } else {
    console.log(`No deck title in ${fn}!`);
    return undefined;
  }

  // parse the file for cards
  let s = content.indexOf('## Card');
  let f = content.indexOf('---');

  while (s !== -1 && f !== -1) {
    cards.push(content.slice(s, f));
    s = content.indexOf('## Card', s + 1);
    f = content.indexOf('---', f + 1);
  }

  if (!cards.length) {
    console.log(`No cards in ${fn}!`);
    return undefined;
  }

  // parse each card for question, answer and explanation
  deck.cards = cards.map((card) => {
    const c = card.slice(card.indexOf('###'));
    const q = c.indexOf('### Question');
    const a = c.indexOf('### Answer');
    const e = c.indexOf('### Explanation');

    if (q === -1 || q === -1 || e === -1) {
      console.log(`Missing required card section(s) in ${fn}!`);
      return undefined;
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
