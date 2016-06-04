/* global describe, xdescribe, it, before, beforeEach, after, afterEach */
import { expect } from 'chai';
import { receiveDecks, selectDeck, fetchDecks } from '../../../client/actions';
import * as types from '../../../client/constants/actionTypes';

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
    it('should be a function', () => {
      expect(fetchDecks).to.be.a('function');
    });
  });
});
