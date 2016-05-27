import { Router } from 'express';
import Decks from '../models/decks';

const router = new Router();

router.route('/api/decks')
  .get((req, res) => {
    Decks.find({}).then((decks) => {
      console.log(decks);
      res
        .status(200)
        .type('json')
        .json(decks);
    });
  });

// router.route('/api/decks/:deckId/card/:cardId')
//   .get((req, res) => {
//     Decks.findOne({ id: req.params.deckId }).then((deck) => {
//       res.status(200).json(deck[req.params.cardId]);
//     });
//   });

export default router;
