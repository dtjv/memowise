const { Router } = require('express');
const play = require('../controllers/play');
const auth = require('../controllers/auth');

const router = new Router();

router.route('/api/play/create')
  .post(auth.checkAuthServer, play.create);

router.route('/api/play/last')
  .post(auth.checkAuthServer, play.getLast);

module.exports = router;
