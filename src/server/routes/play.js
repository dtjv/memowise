const { Router } = require('express');
const play = require('../controllers/play');
const auth = require('../controllers/auth');

const router = new Router();

router.route('/api/play/create')
  .post(auth.isLoggedIn, play.create);

router.route('/api/play/last')
  .post(auth.isLoggedIn, play.getLast);

module.exports = router;
