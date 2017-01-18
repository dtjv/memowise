/* global describe, xdescribe, it, before, beforeEach, after, afterEach */

import 'isomorphic-fetch';
import { expect } from 'chai';
import nock from 'nock';
import thunk from 'redux-thunk';
import cfgMockStore from 'redux-mock-store';
import { receiveDecks, selectDeck, fetchDecks } from '../../../src/client/actions';
import * as types from '../../../src/client/constants/actionTypes';

const mockStore = cfgMockStore([thunk]);

describe('Deck Action Creators', () => {
  describe('receiveDecks', () => {
    it('should be a function', () => {
      expect(receiveDecks).to.be.a('function');
    });

    it('should return object with `type` and `data` properties set', () => {
      const decks = [];
      const result = receiveDecks(decks);
      const expected = { type: types.RECEIVE_DECKS, data: decks };

      expect(result).to.deep.equal(expected);
    });
  });

  describe('selectDeck', () => {
    it('should be a function', () => {
      expect(selectDeck).to.be.a('function');
    });

    it('should return object with `type` and `data` properties set', () => {
      const deck = { _id: '0' };
      const result = selectDeck(deck);
      const expected = { type: types.SELECT_DECK, data: deck };

      expect(result).to.deep.equal(expected);
    });
  });

  describe('fetchDecks', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should be a function', () => {
      expect(fetchDecks).to.be.a('function');
    });

    it('should create RECEIVE_DECKS when fetching decks is done', () => {
      const decks = [{ _id: '0', deckId: '012' }, { _id: '1', deckId: '123' }];
      const expectedActions = [{ type: types.RECEIVE_DECKS, data: decks }];

      nock('http://localhost:3000')
        .get('/api/decks')
        .reply(200, decks);

      const store = mockStore({});

      return store.dispatch(fetchDecks())
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions);
        });
    });
  });
});
