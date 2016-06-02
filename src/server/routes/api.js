import { Router } from 'express';
import { flatMap, shuffle } from 'lodash';
import Decks from '../models/decks';
import User from '../models/user';

import users from '../controllers/users';
import getCard from '../controllers/deck-progress';

const router = new Router();

/*
 * Decks
 */
router.route('/api/decks')
  .get((req, res) => {
    Decks.find({}).then((decks) => {
      res
        .status(200)
        .type('json')
        .json(decks);
    });
  });

router.route('/api/decks/:deckId')
  .get((req, res) => {
    Decks.find({}).then((decks) => {
      const deck = decks[req.params.deckId - 1];
      res
        .status(200)
        .type('json')
        .json(deck);
    });
  });

router.route('/api/card')
  .post((req, res) => {
    console.log(req.body);
    getCard(req.body.deckId).then(card => {
      console.log(card, '<--- card retrieved');
      res
        .status(200)
        .type('json')
        .json(card);
    });

    // // mocked card return
    // res
    //   .status(200)
    //   .type('json')
    //   .json({
    //     _id: '123',
    //     deckId: req.body.deckId,
    //     question: {
    //       text: 'What is 3 + 3?',
    //     },
    //     answer: {
    //       text: 'The answer is 6!',
    //       explanation: 'It is basic addition, bro.',
    //     },
    //   });
  });

router.route('/api/review')
  .get((req, res) => {
    Decks.find({}).then((decks) => {
      const cards = flatMap(decks, deck => deck.cards);

      // unefined _id indicates review deck
      const deck = {
        name: 'Review',
        cards: shuffle(cards),
      };
      res
        .status(200)
        .type('json')
        .json(deck);
    });
  });


/*
 * Auth
 */
router.route('/api/signup')
 .post((req, res) => {
   User.create({
     name: req.body.name,
     email: req.body.email,
     password: req.body.password,
   }).then(user => {
     res
       .status(200)
       .type('json')
       .json(user);
   });
 });

router.route('/api/auth/signin').post(users.signIn);
router.route('/api/auth/verify').get(users.verify);
router.route('/api/auth/signout').get(users.signOut);

export default router;
