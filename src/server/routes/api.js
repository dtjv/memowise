import { Router } from 'express';

// models
// TODO: interaction should only be with controllers
import Decks from '../models/decks';

// controllers
import auth from '../controllers/auth';
import plays from '../controllers/plays';
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

router.route('/api/card')
  .post((req, res) => {
    getCard(req.body.deckId, req.user._id).then(card => {
      res
        .status(200)
        .type('json')
        .json(card);
    });
  });

/*
 * Plays
 */
router.route('/api/play').post(plays.create);
router.route('/api/last-play/deck/:deckId').get(plays.findLatest);

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
