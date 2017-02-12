import { expect } from 'chai';
import nock from 'nock';
import thunk from 'redux-thunk';
import configStore from 'redux-mock-store';
import { receiveCard, fetchCard } from '../../../src/client/actions';
import { RECEIVE_CARD } from '../../../src/client/constants/actionTypes';

require('dotenv-safe').load();

const { HOST, PORT } = process.env;
const baseUrl = `${HOST}:${PORT}`;
const mockStore = configStore([thunk]);

describe('Card Action Creators', () => {
  describe('receiveCard', () => {
    it('should be a function', () => {
      expect(receiveCard).to.be.a('function');
    });

    it('should return object with `type` and `data` properties set', () => {
      const card = { _id: '0' };
      const result = receiveCard(card);
      const expected = { type: RECEIVE_CARD, data: card };

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
      const expectedActions = [
        { type: RECEIVE_CARD, data: card },
      ];

      nock(baseUrl)
        .post('/api/card')
        .reply(200, card);

      const store = mockStore({});

      return store.dispatch(fetchCard(card.deckId, baseUrl))
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions);
        });
    });
  });
});
