import Play from '../models/Play';

const findLatest = (req, res) => {
  Play
    .findOne({ deckId: req.params.deckId, userId: req.user._id })
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

const create = (req, res) => {
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

export default { findLatest, create };
