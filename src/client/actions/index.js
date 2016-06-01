import * as types from '../constants/actionTypes';

export const receiveDecks = decks => ({ type: types.RECEIVE_DECKS, data: decks });
export const selectDeck = deck => ({ type: types.SELECT_DECK, data: deck });
export const receiveCard = card => ({ type: types.RECEIVE_CARD, data: card });

export const startPlay = (cardId, deckId) => ({ type: 'START_PLAY', data: {cardId, deckId} });
export const flipCard = () => ({ type: 'FLIP_CARD' });
export const finishPlay = rating => ({ type: 'FINISH_PLAY', data: rating });

export const failedRequest = error => ({ type: types.ERR_FAILED_REQUEST, data: error });

export const fetchData = () => (
  dispatch => {
    fetch('/api/decks')
      .then(res => res.json())
      .then(decks => dispatch(receiveDecks(decks)))
      .catch(err => dispatch(failedRequest(err)));
  });
