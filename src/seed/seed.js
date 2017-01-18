// import fs from 'fs';
// import db from './dev/server/db';
// import Plays from './dev/server/models/plays.js';
// import Cards from './dev/server/models/cards.js';

// const data = JSON.parse(fs.readFileSync('./data.json'));
// const { dummyPlays, dummyCards, dummyDecks } = data;
// Plays.remove({})
//   .then( () => {
//     Plays.create(dummyPlays)
//       .then( data => {
//         console.log('Data Seeded Successfully');
//       }).then( () => {
//         Cards.remove({})
//           .then( () => {
//             Cards.create(dummyCards)
//               .then( data => {
//                 console.log('Cards Seeded Successfully');
//                 db.disconnect();
//               })
//           })
//       });
//   });
