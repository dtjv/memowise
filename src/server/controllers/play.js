const Play = require('../models/Play');

exports.create = (req, res) => {
  Play.create({
    side: req.body.side,
    deckId: req.body.deckId,
    cardId: req.body.cardId,
    userId: req.user._id,
    rating: req.body.rating,
  })
  .then((play) => {
    res
      .status(201)
      .type('json')
      .json(play);
  })
  .catch((error) => {
    res
      .status(500)
      .type('json')
      .json({ error });
  });
};

exports.getLast = (req, res) => {
  Play.findOne({
    deckId: req.body.deckId,
    userId: req.user._id,
  })
  .sort('-createdAt')
  .then((play) => {
    res
      .status(200)
      .type('json')
      .json(play);
  })
  .catch((error) => {
    res
      .status(500)
      .type('json')
      .json({ error });
  });
};
