import fetch from 'isomorphic-fetch';
import * as types from '../constants/actionTypes';

const isUser = obj =>
  obj && obj._id && obj.name && obj.email;

export const failedRequest = error =>
  ({
    type: types.ERR_FAILED_REQUEST,
    data: error,
  });

// hmm... an action creator that does not return an action
export const signUp = (user, baseUrl = '') => {
  const payload = JSON.stringify(user);

  return () => (
    fetch(`${baseUrl}/api/user/sign-up`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Content-length': payload.length,
      },
      credentials: 'same-origin',
      body: payload,
    })
    .then(res => res.json())
    .then(res => (isUser(res) ? res : Promise.reject(res)))
  );
};

export const signIn = (email, password, baseUrl = '') => {
  const payload = JSON.stringify({ email, password });

  return dispatch => (
    fetch(`${baseUrl}/api/user/sign-in`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Content-length': payload.length,
      },
      credentials: 'same-origin',
      body: payload,
    })
    .then(res => res.json())
    .then(res => (isUser(res) ? res : Promise.reject(res)))
    .then(user => dispatch({ type: types.SIGN_IN, data: user }))
  );
};

export const signOut = (baseUrl = '') => (
  dispatch => (
    fetch(`${baseUrl}/api/user/sign-out`, {
      credentials: 'same-origin',
    })
    .then(() => dispatch({ type: types.SIGN_OUT }))
  ));

export const fetchUser = (baseUrl = '') => (
  () => (
    fetch(`${baseUrl}/api/user`, {
      credentials: 'same-origin',
    })
    .then(res => res.json())
    .then(res => (isUser(res) ? res : Promise.reject(res)))
  ));

export const receiveDecks = decks =>
  ({
    type: types.RECEIVE_DECKS,
    data: decks,
  });

export const selectDeck = deck =>
  ({
    type: types.SELECT_DECK,
    data: deck,
  });

export const fetchDecks = (baseUrl = '') => (
  dispatch => (
    fetch(`${baseUrl}/api/decks`, {
      credentials: 'same-origin',
    })
    .then(res => res.json())
    .then(decks => dispatch(receiveDecks(decks)))
    .catch(err => dispatch(failedRequest(err)))
  ));

export const receiveCard = card =>
  ({
    type: types.RECEIVE_CARD,
    data: card,
  });

export const fetchCard = (deckId, baseUrl = '') => {
  const payload = JSON.stringify({ deckId });

  return dispatch => (
    fetch(`${baseUrl}/api/card`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Content-length': payload.length,
      },
      credentials: 'same-origin',
      body: payload,
    })
    .then(res => res.json())
    .then(card => dispatch(receiveCard(card)))
    .catch(err => dispatch(failedRequest(err)))
  );
};

export const startPlay = (cardId, deckId) =>
  ({
    type: types.START_PLAY,
    data: { cardId, deckId },
  });

export const finishPlay = rating =>
  ({
    type: types.FINISH_PLAY,
    data: rating,
  });

export const flipCard = () =>
  ({
    type: types.FLIP_CARD,
  });

export const savePlay = (play, rating, baseUrl = '') => {
  const payload = JSON.stringify({ ...play, rating });

  return dispatch => (
    fetch(`${baseUrl}/api/play/create`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Content-length': payload.length,
      },
      credentials: 'same-origin',
      body: payload,
    })
    .then(() => dispatch(finishPlay(rating)))
    .catch(err => dispatch(failedRequest(err)))
  );
};
