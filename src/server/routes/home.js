const { Router } = require('express');
const indexView = require('../views');

const router = new Router();

router.get('*', (req, res) => {
  res.send(indexView);
});

module.exports = router;
