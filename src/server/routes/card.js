const { Router } = require('express');
const controller = require('../controllers/card');
const { isLoggedIn } = require('../services/auth');

const router = new Router();

router.route('/api/card')
  .post(isLoggedIn, controller.getNext);

module.exports = router;
