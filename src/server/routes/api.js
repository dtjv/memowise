const { Router } = require('express');

const deck = require('../controllers/deck');
const card = require('../controllers/card');
const play = require('../controllers/play');
const auth = require('../controllers/auth');

const router = new Router();

/*
 * Deck
 */
router.route('/api/deck')
  .get(auth.checkAuthServer, deck.getAll);
router.route('/api/deck/:deckId/percent-complete')
  .get(auth.checkAuthServer, deck.getPercentComplete);

/*
 * Card
 */
router.route('/api/card')
  .post(auth.checkAuthServer, card.getNext);

/*
 * Play
 */
router.route('/api/play/create')
  .post(auth.checkAuthServer, play.create);
router.route('/api/play/last')
  .post(auth.checkAuthServer, play.getLast);

/*
 * Auth
 */
router.route('/api/auth/create-account')
  .post(auth.createAccount);
router.route('/api/auth/sign-in')
  .post(auth.signIn);
router.route('/api/auth/verify')
  .get(auth.verify);
router.route('/api/auth/sign-out')
  .get(auth.signOut);
router.route('/api/auth/check-authorized')
  .get(auth.checkAuthorized);

module.exports = router;
