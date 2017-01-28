const { Router } = require('express');
const controller = require('../controllers/play');
const { isLoggedIn } = require('../services/auth');

const router = new Router();

router.route('/api/play/create')
  .post(isLoggedIn, controller.create);

router.route('/api/play/last')
  .post(isLoggedIn, controller.getLast);

module.exports = router;
