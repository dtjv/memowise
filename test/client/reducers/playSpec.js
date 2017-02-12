import { expect } from 'chai';
import { play } from 'client/reducers';
import {
  START_PLAY,
  FLIP_CARD,
  FINISH_PLAY,
} from 'client/constants/actionTypes';
import { FRONT, BACK, GREAT, BAD } from 'client/constants/play';

describe('Play Reducer', () => {
  it('should be a function', () => {
    expect(play).to.be.a('function');
  });

  it('should return existing play state by default', () => {
    const state = { _id: '0' };
    const action = { type: 'NOOP_ACTION' };

    const result = play(state, action);
    const expected = state;

    expect(result).to.deep.equal(expected);
    expect(result).to.equal(state);
  });

  describe('START_PLAY', () => {
    it('should return a new play object', () => {
      const state = {
        deckId: '0',
        cardId: '1',
        side: FRONT,
        rating: GREAT,
      };
      const action = {
        type: START_PLAY,
        data: {
          deckId: '5',
          cardId: '6',
        },
      };

      const result = play(state, action);
      const expected = {
        deckId: '5',
        cardId: '6',
        side: FRONT,
        rating: null,
      };

      expect(result).to.deep.equal(expected);
      expect(result).to.not.equal(state);
    });

    it('should return existing play state given undefined data', () => {
      const state = {
        deckId: '0',
        cardId: '1',
        side: BACK,
        rating: BAD,
      };
      const action = { type: START_PLAY, data: undefined };

      const result = play(state, action);
      const expected = state;

      expect(result).to.deep.equal(expected);
      expect(result).to.equal(state);
    });
  });

  describe('FLIP_CARD', () => {
    it('should return a new play object with side property changed', () => {
      const state = {
        deckId: '0',
        cardId: '1',
        side: FRONT,
        rating: null,
      };
      const action = { type: FLIP_CARD };

      const result = play(state, action);
      const expected = {
        deckId: '0',
        cardId: '1',
        side: BACK,
        rating: null,
      };

      expect(result).to.deep.equal(expected);
      expect(result).to.not.equal(state);
    });
  });

  describe('FINISH_PLAY', () => {
    it('should return a new play object with new rating', () => {
      const state = {
        deckId: '0',
        cardId: '1',
        side: FRONT,
        rating: null,
      };
      const action = { type: FINISH_PLAY, data: BAD };

      const result = play(state, action);
      const expected = {
        deckId: '0',
        cardId: '1',
        side: FRONT,
        rating: BAD,
      };

      expect(result).to.deep.equal(expected);
      expect(result).to.not.equal(state);
    });

    it('should return existing play state given undefined rating', () => {
      const state = {
        deckId: '0',
        cardId: '1',
        side: FRONT,
        rating: BAD,
      };
      const action = { type: FINISH_PLAY, data: undefined };

      const result = play(state, action);
      const expected = state;

      expect(result).to.deep.equal(expected);
      expect(result).to.equal(state);
    });
  });
});
