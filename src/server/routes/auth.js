const { Router } = require('express');
const auth = require('../controllers/auth');

const router = new Router();

router.route('/api/auth/sign-up')
  .post(auth.local.signUp);

router.route('/api/auth/sign-in')
  .post(auth.local.signIn);

router.route('/api/auth/sign-out')
  .get((req, res) => {
    req.logout();
    res.redirect('/');
  });

module.exports = router;
