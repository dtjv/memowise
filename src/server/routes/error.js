import { Router } from 'express';
const router = new Router();

router
  .route('*')
  .get((req, res) => {
    res
      .status(404)
      .type('json')
      .json({ get: 404 });
  });

export default router;
