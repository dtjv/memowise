/* global describe, xdescribe, it, before, beforeEach, after, afterEach */
import { expect } from 'chai';
import { startPlay, flipCard, savePlay } from '../../../client/actions';
import * as types from '../../../client/constants/actionTypes';

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
    it('should be a function', () => {
      expect(savePlay).to.be.a('function');
    });
  });
});
