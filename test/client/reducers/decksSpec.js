import { expect } from 'chai';
import { decks } from '../../../src/client/reducers';
import { RECEIVE_DECKS } from '../../../src/client/constants/actionTypes';

describe('Decks Reducer', () => {
  describe('RECEIVE_DECKS', () => {
    it('should be a function', () => {
      expect(decks).to.be.a('function');
    });

    it('should return existing decks state by default', () => {
      const state = [{ _id: '0' }, { _id: '1' }];
      const action = { type: 'NOOP_ACTION' };

      const result = decks(state, action);
      const expected = state;

      expect(result).to.deep.equal(expected);
      expect(result).to.equal(state);
    });

    it('should return a new array of decks objects', () => {
      const state = [{ _id: '0' }, { _id: '1' }];
      const action = { type: RECEIVE_DECKS, data: [{ _id: '2' }] };

      const result = decks(state, action);
      const expected = [{ _id: '2' }];

      expect(result).to.deep.equal(expected);
      expect(result).to.not.equal(state);
    });

    it('should return existing decks state given undefined data', () => {
      const state = [{ _id: '0' }, { _id: '1' }];
      const action = { type: RECEIVE_DECKS, data: undefined };

      const result = decks(state, action);
      const expected = state;

      expect(result).to.deep.equal(expected);
      expect(result).to.equal(state);
    });
  });
});
