const { Router } = require('express');
const controller = require('../controllers/user');

const router = new Router();

// may not need
router.route('/api/user').get(controller.fetchUser);

router.route('/api/user/sign-up').post(controller.signUp);

router.route('/api/user/sign-in').post(controller.signIn);

router.route('/api/user/sign-out').get(controller.signOut);

module.exports = router;
