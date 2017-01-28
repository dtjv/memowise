const { Router } = require('express');
const controller = require('../controllers/deck');
const { isLoggedIn } = require('../services/auth');

const router = new Router();

router.route('/api/deck')
  .get(isLoggedIn, controller.getAll);

router.route('/api/deck/:deckId/percent-complete')
  .get(isLoggedIn, controller.getPercentComplete);


module.exports = router;
