/* global describe, xdescribe, it, before, beforeEach, after, afterEach */
import { expect } from 'chai';
import { card } from '../../../src/client/reducers';
import { RECEIVE_CARD } from '../../../src/client/constants/actionTypes';

describe('Card Reducer', () => {
  describe('RECEIVE_CARD', () => {
    it('should be a function', () => {
      expect(card).to.be.a('function');
    });

    it('should return existing card state by default', () => {
      const state = { _id: '0' };
      const action = { type: 'NOOP_ACTION' };

      const result = card(state, action);
      const expected = state;

      expect(result).to.deep.equal(expected);
      expect(result).to.equal(state);
    });

    it('should return a new card as  ', () => {
      const state = { _id: '0' };
      const action = { type: RECEIVE_CARD, data: { _id: '1' } };

      const result = card(state, action);
      const expected = { _id: '1' };

      expect(result).to.deep.equal(expected);
      expect(result).to.not.deep.equal(state);
    });

    it('should return existing card state given undefined data', () => {
      const state = { _id: '0' };
      const action = { type: RECEIVE_CARD, data: undefined };

      const result = card(state, action);
      const expected = state;

      expect(result).to.deep.equal(expected);
      expect(result).to.equal(state);
    });
  });
});
