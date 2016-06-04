import { Router } from 'express';
import { flatMap, shuffle } from 'lodash';

// models
// TODO: interaction should only be with controllers
import Decks from '../models/decks';
import Play from '../models/plays';

// controllers
import users from '../controllers/users';
import getCard from '../controllers/deck-progress';
import getProgress from '../controllers/progress-bar.js';

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
    getCard(req.body.deckId, req.user._id).then(card => {
      res
        .status(200)
        .type('json')
        .json(card);
    });
  });

router.route('/api/play')
  .post((req, res) => {
    Play.create({
      side: req.body.side,
      deckId: req.body.deckId,
      cardId: req.body.cardId,
      userId: req.user._id,
      rating: req.body.rating,
    })
    .then(play => {
      res
        .status(201)
        .type('json')
        .json(play);
    })
    .catch(error => {
      res
        .status(500)
        .type('json')
        .json({ error });
    });
  });

router.route('/api/review')
  .get((req, res) => {
    Decks.find({}).then((decks) => {
      const cards = flatMap(decks, deck => deck.cards);

      // undefined _id indicates review deck
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
 * Progress
 */
router.route('/api/progress')
  .post((req, res) => {
    getProgress(req.body.deckId, req.user._id).then(percentage => {
      res
        .status(200)
        .type('json')
        .json(percentage);
    });
  });


/*
 * Auth
 */
router.route('/api/auth/create-account').post(users.createAccount);
router.route('/api/auth/sign-in').post(users.signIn);
router.route('/api/auth/verify').get(users.verify);
router.route('/api/auth/sign-out').get(users.signOut);

export default router;
