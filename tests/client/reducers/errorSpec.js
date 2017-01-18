/* global describe, xdescribe, it, before, beforeEach, after, afterEach */
import { expect } from 'chai';
import { error } from '../../../src/client/reducers';
import { ERR_FAILED_REQUEST } from '../../../src/client/constants/actionTypes';

describe('Error Reducer', () => {
  describe('ERR_FAILED_REQUEST', () => {
    it('should be a function', () => {
      expect(error).to.be.a('function');
    });

    it('should return existing error state by default', () => {
      const state = { _id: '0' };
      const action = { type: 'NOOP_ACTION' };

      const result = error(state, action);
      const expected = state;

      expect(result).to.deep.equal(expected);
      expect(result).to.equal(state);
    });

    it('should return a new error object', () => {
      const state = {};
      const action = { type: ERR_FAILED_REQUEST, data: { _id: '0' } };

      const result = error(state, action);
      const expected = { _id: '0' };

      expect(result).to.deep.equal(expected);
      expect(result).to.not.deep.equal(state);
    });

    it('should return existing error state given undefined data', () => {
      const state = { _id: '0' };
      const action = { type: ERR_FAILED_REQUEST, data: undefined };

      const result = error(state, action);
      const expected = state;

      expect(result).to.deep.equal(expected);
      expect(result).to.equal(state);
    });
  });
});
