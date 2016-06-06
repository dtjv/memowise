import Deck from '../models/Deck';

import getCard from '../services/DeckProgress';
import getProgress from '../services/ProgressBar.js';

const findAll = (req, res) => {
  Deck.find({}).then((decks) => {
    res
      .status(200)
      .type('json')
      .json(decks);
  });
};

const findNextCard = (req, res) => {
  getCard(req.body.deckId, req.user._id).then(card => {
    res
      .status(200)
      .type('json')
      .json(card);
  });
};

const progress = (req, res) => {
  getProgress(req.body.deckId, req.user._id).then(percentage => {
    res
      .status(200)
      .type('json')
      .json(percentage);
  });
};

export default { findAll, findNextCard, progress };
