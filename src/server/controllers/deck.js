const Deck = require('../models/Deck');
const { getPercentComplete } = require('../services/deck');

exports.getAll = (req, res) => {
  Deck.find({})
    .then((decks) => {
      res.status(200).json(decks);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.getPercentComplete = (req, res) => {
  getPercentComplete(req.params.deckId, req.user._id)
    .then((percentage) => {
      res.status(200).json(percentage);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
