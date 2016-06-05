/* global describe, xdescribe, it, before, beforeEach, after, afterEach */
import { expect } from 'chai';
import { user } from '../../../src/client/reducers';
import { SIGN_IN, SIGN_OUT } from '../../../src/client/constants/actionTypes';

describe('User Reducer', () => {
  it('should be a function', () => {
    expect(user).to.be.a('function');
  });

  it('should return existing user state by default', () => {
    const state = { _id: '0' };
    const action = { type: 'NOOP_ACTION' };

    const result = user(state, action);
    const expected = state;

    expect(result).to.deep.equal(expected);
    expect(result).to.equal(state);
  });

  describe('SIGN_IN', () => {
    it('should return a new user', () => {
      const state = { _id: '0' };
      const action = { type: SIGN_IN, data: { _id: '1' } };

      const result = user(state, action);
      const expected = { _id: '1' };

      expect(result).to.deep.equal(expected);
      expect(result).to.not.deep.equal(state);
    });

    it('should return existing card state given undefined data', () => {
      const state = { _id: '0' };
      const action = { type: SIGN_IN, data: undefined };

      const result = user(state, action);
      const expected = state;

      expect(result).to.deep.equal(expected);
      expect(result).to.equal(state);
    });
  });

  describe('SIGN_OUT', () => {
    it('should return an empty object', () => {
      const state = { _id: '0' };
      const action = { type: SIGN_OUT };

      const result = user(state, action);
      const expected = {};

      expect(result).to.deep.equal(expected);
      expect(result).to.not.deep.equal(state);
    });
  });
});
