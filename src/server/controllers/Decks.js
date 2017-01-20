const Deck = require('../models/Deck');
const getCard = require('../services/DeckProgress');
const getProgress = require('../services/ProgressBar');

exports.findAll = (req, res) => {
  Deck.find({}).then((decks) => {
    res
      .status(200)
      .type('json')
      .json(decks);
  });
};

exports.findNextCard = (req, res) => {
  getCard(req.body.deckId, req.user._id).then((card) => {
    res
      .status(200)
      .type('json')
      .json(card);
  });
};

exports.progress = (req, res) => {
  getProgress(req.body.deckId, req.user._id).then((percentage) => {
    res
      .status(200)
      .type('json')
      .json(percentage);
  });
};
