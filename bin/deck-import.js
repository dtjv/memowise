// const path = require('path');
// const fs = require('fs');
// const MongoClient = require('mongodb').MongoClient;
// const cfg = require('../dev/server/config').default;

// const dbUrl = `mongodb://${cfg.db.host}:${cfg.db.port}/${cfg.db.dbName}`;
// const collectionName = 'decks';

// // deck shape (mostly for reference)
// const deck = {
//   name: '',
// };

// const cards = [];
// let deckId = '';

// let startedAt;
// const cardSections = [];

// const parseDeckFile = (line, no, file) => {
//   // get the deck title
//   const title = line.match(/^# (.+)/);
//   if (title) {
//     deck.name = title[1];
//   }

//   // card section started
//   if (line.match(/^## Card(\w*)/)) {
//     if (startedAt) {
//       throw Error('File could not be parsed.');
//     }
//     startedAt = no + 1;
//   }

//   // card section ended
//   if (line.match(/^-{3,}$/)) {
//     if (!startedAt) {
//       throw Error('File could not be parsed.');
//     }
//     cardSections.push(file.slice(startedAt, no));
//     startedAt = null;
//   }
// };

// const parseCardSection = (cardSection) => {
//   const card = { deckId };
//   cardSection.forEach((line, no, section) => {
//     // card property found
//     const propStart = line.match(/^### (Question|Answer|Explanation+)/);
//     if (propStart) {
//       if (propStart[1] === 'Question') {
//         // mark the start of the question
//         startedAt = no + 1;
//       } else if (propStart[1] === 'Answer') {
//         // mark the end of a question and the start of an answer
//         card.question = {
//           text: section.slice(startedAt, no).join('\n'),
//         };
//         startedAt = no + 1;
//       } else if (propStart[1] === 'Explanation') {
//         // mark the end of an answer and the rest is assumed to be explanation
//         card.answer = {
//           text: section.slice(startedAt, no).join('\n'),
//           explanation: section.slice(no + 1).join('\n'),
//         };
//       }
//     }
//   });
//   cards.push(card);
// };

// const insertCards = (db) => {
//   db.collection('cards').insert(cards, (err) => {
//     db.close();
//     if (err) throw err;
//     process
//       .stdout
//       .write(`cards have been added to the ${collectionName} ` +
//         `collection in the ${cfg.db.dbName} database.\n`);
//   });
// };

// // insert a deck into the mongo collection
// const insertDeck = (db) => {
//   db.collection('decks').insert(deck, (err) => {
//     deckId = deck._id.toString();
//     // go through each identified card section
//     cardSections.forEach(parseCardSection);
//     if (err) throw err;
//     process
//       .stdout
//       .write(`"${deck.name}" deck has been added to the ${collectionName} ` +
//         `collection in the ${cfg.db.dbName} database.\n`);
//     insertCards(db);
//   });
// };

// // TODO: absolute paths not supported (maybe meow can do this better)
// const filePath = path.join(__dirname, '../', process.argv[2], process.argv[3]);
// fs.readFileSync(filePath, 'utf8').split('\n').forEach(parseDeckFile);


// // Use connect method to connect to the server
// MongoClient.connect(dbUrl, (err, db) => {
//   if (err) throw err;
//   insertDeck(db);
// });
