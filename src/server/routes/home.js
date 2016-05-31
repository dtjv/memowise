import { Router } from 'express';
import { join } from 'path';

const router = new Router();

router.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../views/index.html'));
});

export default router;
