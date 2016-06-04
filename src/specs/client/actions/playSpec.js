/* global describe, xdescribe, it, before, beforeEach, after, afterEach */
import 'isomorphic-fetch';
import { expect } from 'chai';
import nock from 'nock';
import thunk from 'redux-thunk';
import cfgMockStore from 'redux-mock-store';
import { startPlay, flipCard, savePlay } from '../../../client/actions';
import * as types from '../../../client/constants/actionTypes';
import { GREAT } from '../../../client/constants/play';

const mockStore = cfgMockStore([thunk]);

describe('Play Action Creators', () => {
  describe('startPlay', () => {
    it('should be a function', () => {
      expect(startPlay).to.be.a('function');
    });

    it('should return object with `type` and `data` properties set', () => {
      const cardId = '0';
      const deckId = '1';
      const result = startPlay(cardId, deckId);
      const expected = { type: types.START_PLAY, data: { cardId, deckId } };

      expect(result).to.deep.equal(expected);
    });
  });

  describe('flipCard', () => {
    it('should be a function', () => {
      expect(flipCard).to.be.a('function');
    });

    it('should return object with `type` property set', () => {
      const result = flipCard();
      const expected = { type: types.FLIP_CARD };

      expect(result).to.deep.equal(expected);
    });
  });

  describe('savePlay', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should be a function', () => {
      expect(savePlay).to.be.a('function');
    });

    it('should create FINISH_PLAY when fetching decks is done', () => {
      const expectedActions = [{ type: types.FINISH_PLAY, data: GREAT }];

      nock('http://localhost:3000')
        .post('/api/play')
        .reply(200, {});

      const store = mockStore({});

      return store.dispatch(savePlay({}, GREAT))
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions);
        });
    });
  });
});
