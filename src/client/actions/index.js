import * as types from '../constants/actionTypes';
import Auth from '../services/AuthService';

export const receiveDecks = decks => ({ type: types.RECEIVE_DECKS, data: decks });
export const selectDeck = deck => ({ type: types.SELECT_DECK, data: deck });
export const receiveCard = card => ({ type: types.RECEIVE_CARD, data: card });

export const startPlay = (cardId, deckId) => ({ type: 'START_PLAY', data: { cardId, deckId } });
export const flipCard = () => ({ type: 'FLIP_CARD' });
export const finishPlay = rating => ({ type: 'FINISH_PLAY', data: rating });

export const signIn = user => ({ type: types.SIGN_IN, data: user });
export const signOut = () => ({ type: types.SIGN_OUT });

export const failedRequest = error => ({ type: types.ERR_FAILED_REQUEST, data: error });

export const verifyAuthentication = () => (
  dispatch => {
    Auth.verify()
      .then(user => dispatch(signIn(user)))
      .catch(err => dispatch(failedRequest(err)));
  });

export const fetchData = () => (
  dispatch => {
    fetch('/api/decks')
      .then(res => res.json())
      .then(decks => dispatch(receiveDecks(decks)))
      .catch(err => dispatch(failedRequest(err)));
  });
