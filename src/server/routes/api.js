import { Router } from 'express';

// controllers
import decks from '../controllers/Decks';
import plays from '../controllers/Plays';
import auth from '../controllers/Auth';

const router = new Router();

/*
 * Decks
 */
router.route('/api/decks').get(decks.findAll);
router.route('/api/card').post(decks.findNextCard);
router.route('/api/progress').post(decks.progress);

/*
 * Plays
 */
router.route('/api/play').post(plays.create);
router.route('/api/last-play/deck/:deckId').get(plays.findLatest);

/*
 * Auth
 */
router.route('/api/auth/create-account').post(auth.createAccount);
router.route('/api/auth/sign-in').post(auth.signIn);
router.route('/api/auth/verify').get(auth.verify);
router.route('/api/auth/sign-out').get(auth.signOut);
router.route('/api/auth/check-authorized').get(auth.checkAuthorized);

export default router;
