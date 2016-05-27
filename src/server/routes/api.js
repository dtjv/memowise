import { Router } from 'express';
import Decks from '../models/decks';

const router = new Router();

router.route('/api/decks')
  .get((req, res) => {
    Decks.find({}).then((decks) => {
      res
        .status(200)
        .type('json')
        .json(decks);
    });
  });

export default router;
