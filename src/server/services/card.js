const uniqueRandomArray = require('unique-random-array');
const Card = require('../models/Card');
const Play = require('../models/Play');

exports.getNextCardToPlay = (deckId, userId) =>
  Card.find({ deckId })
    .then((cards) => {
      // no cards? should never happen! empty decks shouldn't be in ui.
      if (!cards.length) {
        return Promise.reject({ message: 'No cards found!' });
      }

      const MAX_TRIES = 10;
      const getRandomCard = uniqueRandomArray(cards);
      const getProbability = () => Math.random() * 0.5;

      let tries = 0;
      let randomCard = getRandomCard();
      let probability = getProbability();

      const getNextCard = () =>
        Play.find({ deckId, userId, cardId: randomCard._id })
          .then((plays) => {
            let totalRating = 0;

            if (plays.length) {
              totalRating = plays.reduce((sum, play) =>
                sum - Number(play.rating), 0);
            } else {
              return randomCard;
            }

            const randomCardProbability = Math.random() * (totalRating ** 2);

            if ((probability > randomCardProbability) && (tries < MAX_TRIES)) {
              randomCard = getRandomCard();
              probability = getProbability();
              tries += 1;
              return getNextCard();
            }

            return randomCard;
          });

      return getNextCard();
    });
