/* global describe, it, before, beforeEach, after, afterEach */
import { expect } from 'chai';
import { receiveCard, fetchCard } from '../../client/actions';
import * as types from '../../client/constants/actionTypes';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Card Action Creators', () => {
  describe('receiveCard', () => {
    it('should be a function', () => {
      expect(receiveCard).to.be.a('function');
    });

    it('should return object with `type` and `data` properties set', () => {
      const card = { _id: '0' };
      const result = receiveCard(card);
      const expected = { type: types.RECEIVE_CARD, data: card };

      expect(result).to.deep.equal(expected);
    });
  });

  describe('fetchCard', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should be a function', () => {
      expect(fetchCard).to.be.a('function');
    });

    it('should create RECEIVE_CARD when fetching a card is done', () => {
      const card = { _id: '1', deckId: '123' };
      const expectedActions = [{ type: types.RECEIVE_CARD, data: card }];

      nock('http://localhost:3000')
        .post('/api/card', {
          body: { deckId: '123' },
        })
        .reply(200, card);

      const store = mockStore({});

      return store.dispatch(fetchCard())
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions);
        });
    });
  });
});
