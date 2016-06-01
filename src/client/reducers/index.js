import {
  RECEIVE_DECKS,
  SELECT_DECK,
  RECEIVE_CARD,
  ERR_FAILED_REQUEST,
} from '../constants/actionTypes';

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

export const error = (state, action) => {
  switch (action.type) {
    case ERR_FAILED_REQUEST: {
      return action.data || state;
    }
    default:
      return state || {};
  }
};
