/* global describe, xdescribe, it, before, beforeEach, after, afterEach */
import { expect } from 'chai';
import { card } from '../../client/reducers';
import { RECEIVE_CARD } from '../../client/constants/actionTypes';

describe('Card Reducer', () => {
  it('should be a function', () => {
    expect(card).to.be.a('function');
  });

  it('should return a new card as  ', () => {
    const state = { _id: '0' };
    const action = { type: RECEIVE_CARD, data: { _id: '1' } };

    const result = card(state, action);
    const expected = { _id: '1' };

    expect(result).to.deep.equal(expected);
    expect(result).to.not.deep.equal(state);
  });
});
