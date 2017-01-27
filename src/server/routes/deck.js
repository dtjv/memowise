const { Router } = require('express');
const deck = require('../controllers/deck');
const auth = require('../controllers/auth');

const router = new Router();

router.route('/api/deck')
  .get(auth.isLoggedIn, deck.getAll);

router.route('/api/deck/:deckId/percent-complete')
  .get(auth.isLoggedIn, deck.getPercentComplete);


module.exports = router;
