/* global describe, it, before, beforeEach, after, afterEach */
import { expect } from 'chai';
import { deck } from '../../../src/client/reducers';
import { SELECT_DECK } from '../../../src/client/constants/actionTypes';

describe('Deck Reducer', () => {
  describe('SELECT_DECK', () => {
    it('should be a function', () => {
      expect(deck).to.be.a('function');
    });

    it('should return existing deck state by default', () => {
      const state = { _id: '0' };
      const action = { type: 'NOOP_ACTION' };

      const result = deck(state, action);
      const expected = state;

      expect(result).to.deep.equal(expected);
      expect(result).to.equal(state);
    });

    it('should return a new deck object', () => {
      const state = { _id: '0' };
      const action = { type: SELECT_DECK, data: { _id: '1' } };

      const result = deck(state, action);
      const expected = { _id: '1' };

      expect(result).to.deep.equal(expected);
      expect(result).to.not.equal(state);
    });

    it('should return existing deck state given undefined data', () => {
      const state = { _id: '0' };
      const action = { type: SELECT_DECK, data: undefined };

      const result = deck(state, action);
      const expected = state;

      expect(result).to.deep.equal(expected);
      expect(result).to.equal(state);
    });
  });
});
