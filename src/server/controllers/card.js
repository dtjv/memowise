const { getNextCardToPlay } = require('../services/card');

exports.getNext = (req, res) => {
  getNextCardToPlay(req.body.deckId, req.user._id)
    .then((card) => {
      res
        .status(200)
        .type('json')
        .json(card);
    })
    .catch((error) => {
      res
        .status(500)
        .type('json')
        .json({ error });
    });
};
