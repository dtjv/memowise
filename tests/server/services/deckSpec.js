/* global describe, it, before, beforeEach, after, afterEach, xdescribe */
/* eslint-disable func-names, prefer-arrow-callback */

// import { expect } from 'chai';
// import getCard from '../../src/server/services/DeckProgress';
// import getProgress from '../../src/server/services/ProgressBar';
// import Cards from '../../../src/server/models/Card';
// import Plays from '../../../src/server/models/Play';

// const createCards = () => {
//   const allCards = [];
//   for (let i = 0; i < 10; i += 1) {
//     const dummy = i.toString();
//     allCards.push({
//       question: { text: dummy },
//       answer: { text: dummy, explanation: ' ' },
//       deckId: '-1',
//     });
//   }
//   return allCards;
// };

// const createPlays = (cards, n) => {
//   const allPlays = [];
//   for (let i = 0; i < n; i += 1) {
//     allPlays.push({
//       rating: '0',
//       deckId: '-1',
//       cardId: cards[i]._id,
//       userId: '0',
//     });
//   }
//   return allPlays;
// };

// const calcPerc = (deck, n) => `${(100 * n) / deck.length}%`;
// let realPerc = 0;

// // seed data by running npm run seed before testing deck-progress
// describe('deck-progress', function () {
//   // this.timeout(5000);

//   before(function (done) {
//     const allCards = createCards();
//     const n = 5;
//     let allPlays = [];
//     Cards.remove({ deckId: '-1' })
//       .then(() => (
//         Cards.create(allCards)
//       ))
//       .then(cards => (
//         Plays.remove({ deckId: '-1' })
//           .then(() => {
//             allPlays = createPlays(cards, n);
//             realPerc = calcPerc(cards, n);
//             return Plays.create(allPlays);
//           })
//           .then(() => {
//             done();
//           })
//       ));
//   });

//   describe('deck-progress basics', function () {
//     it('should correctly have an function named `getCard`', (done) => {
//       expect(getCard).to.be.a('function');
//       done();
//     });

//     it('should return a random card given a deck id', (done) => {
//       getCard('-1', '0').then(function (card) {
//         expect(card.deckId).to.equal('-1');
//         expect(card.question).to.not.equal(undefined);
//         done();
//       });
//     });
//   });

//   describe('progress-bar basics', function () {
//     // create new plays with only some cards
//     it('should correctly have an function named `getProgress`', (done) => {
//       expect(getProgress).to.be.a('function');
//       done();
//     });

//     it('should return the percentage of distinct cards seen', (done) => {
//       getProgress('-1', '0').then(function (perc) {
//         expect(perc).to.equal(realPerc);
//         done();
//       });
//     });
//   });
// });

