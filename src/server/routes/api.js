import { Router } from 'express';
import { flatMap, shuffle } from 'lodash';
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

router.route('/api/review')
  .get((req, res) => {
    Decks.find({}).then((decks) => {
      const cards = flatMap(decks, function(deck) {
        return deck.cards;
      });

      // unefined _id indicates review deck
      const deck = {
        name: 'Review',
        cards: shuffle(cards)
      };

      res
        .status(200)
        .type('json')
        .json(deck);
    });
  });


export default router;
