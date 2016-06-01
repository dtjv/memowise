/*
decks
RECEIVE_DECKS
​
deck
SELECT_DECK
​
card
RECEIVE_CARD
​
play
START_PLAY
FLIP_CARD
FINISH_PLAY
*/
{
  decks: [...],
  deck: {
    _id: ...,
    name: ...,
  },
  card: {
    _id: ...,
    deckId: ...,
    question: {...},
    answer: {...},
  },
  user: {
    _id: ...,
    name: ...,
  },
  play: {
    side: FRONT
    deckId: ...,
    cardId: ...,
    userId: ...,
    rating: OKAY,
  }
}
​
store.dispatch({
  type: 'FINISH_PLAY',
  data: {
    rating: -1,
  }
})
​
store.dispatch({
  type: 'START_PLAY',
  data: {
    deckId: ...,
    cardId: ...,
    userId: ...,
  }
})
​
store.dispatch({
  type: 'FINISH_PLAY',
  data: {
    result: -1,
  }
})
