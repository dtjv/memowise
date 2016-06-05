import { Router } from 'express';

// models
// TODO: interaction should only be with controllers
import Decks from '../models/decks';
import Play from '../models/plays';

// controllers
import auth from '../controllers/auth';
import getCard from '../controllers/deck-progress';
import getProgress from '../controllers/progress-bar.js';

const router = new Router();

/*
 * Decks
 */
router.route('/api/last-play/deck/:deckId')
  .get((req, res) => {
    Play
      .findOne({ deckId: req.params.deckId })
      .sort('-createdAt')
      .then(play => {
        res
          .status(200)
          .type('json')
          .json(play);
      });
  });

router.route('/api/decks')
  .get((req, res) => {
    Decks.find({}).then((decks) => {
      res
        .status(200)
        .type('json')
        .json(decks);
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
router.route('/api/auth/create-account').post(auth.createAccount);
router.route('/api/auth/sign-in').post(auth.signIn);
router.route('/api/auth/verify').get(auth.verify);
router.route('/api/auth/sign-out').get(auth.signOut);

export default router;
