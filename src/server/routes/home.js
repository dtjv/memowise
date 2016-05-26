import { Router } from 'express';

const router = new Router();

router.get('/', (req, res) => {
  res.render('index.jade');
});

export default router;
