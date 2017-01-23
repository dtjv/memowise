const { Router } = require('express');
const auth = require('../controllers/auth');

const router = new Router();

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
