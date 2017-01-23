const { Router } = require('express');
const card = require('../controllers/card');
const auth = require('../controllers/auth');

const router = new Router();

router.route('/api/card')
  .post(auth.checkAuthServer, card.getNext);

module.exports = router;
