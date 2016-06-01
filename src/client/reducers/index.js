import {
  RECEIVE_DECKS,
  SELECT_DECK,
  RECEIVE_CARD,
  START_PLAY,
  FLIP_CARD,
  FINISH_PLAY,
  ERR_FAILED_REQUEST,
} from '../constants/actionTypes';

import {
  FRONT,
  BACK
} from '../constants/play';

export const decks = (state, action) => {
  switch (action.type) {
    case RECEIVE_DECKS: {
      return action.data || state;
    }
    default:
      return state || [];
  }
};

export const deck = (state, action) => {
  switch (action.type) {
    case SELECT_DECK: {
      return action.data || state;
    }
    default:
      return state || {};
  }
};

export const card = (state, action) => {
  switch (action.type) {
    case RECEIVE_CARD: {
      return action.data || state;
    }
    default:
      return state || {};
  }
};

export const play = (state, action) => {
  switch (action.type) {
    case START_PLAY:
      let newPlay = {
        deckId: action.data.deckId,
        cardId: action.data.cardId,
        side: FRONT,
        rating: null,
      };

      return newPlay;
    case FLIP_CARD:
      return {...state, side: BACK};
    case FINISH_PLAY:
      return {...state, rating: action.data};
    default:
      return state || {};
  }
}

export const error = (state, action) => {
  switch (action.type) {
    case ERR_FAILED_REQUEST: {
      return action.data || state;
    }
    default:
      return state || {};
  }
};
