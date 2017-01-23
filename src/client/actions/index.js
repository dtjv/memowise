import fetch from 'isomorphic-fetch';
import * as types from '../constants/actionTypes';
import Auth from '../services/AuthService';
import { config } from '../config';

const url = `${config.api.protocol}://${config.api.host}:${config.api.port}`;

export const failedRequest = error =>
  ({
    type: types.ERR_FAILED_REQUEST,
    data: error,
  });

export const signIn = user =>
  ({
    type: types.SIGN_IN,
    data: user,
  });

export const signOut = () =>
  ({
    type: types.SIGN_OUT,
  });

export const verifyAuthentication = () => (
  (dispatch) => {
    Auth.verify()
      .then(user => dispatch(signIn(user)))
      .catch(err => dispatch(failedRequest(err)));
  });

export const cancelAuthentication = () => (
  (dispatch) => {
    Auth.signOut()
      .then(() => dispatch(signOut()))
      .catch(err => dispatch(failedRequest(err)));
  });

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

export const fetchDecks = () => (
  dispatch => (
    fetch(`${url}/api/decks`, {
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

export const fetchCard = (deckId) => {
  const payload = JSON.stringify({ deckId });

  return dispatch => (
    fetch(`${url}/api/card`, {
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

export const savePlay = (play, rating) => {
  const payload = JSON.stringify({ ...play, rating });

  return dispatch => (
    fetch(`${url}/api/play/create`, {
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
