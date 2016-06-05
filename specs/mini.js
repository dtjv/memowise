/* global describe, xdescribe, xit, it, before, beforeEach, after, afterEach */

import { expect } from 'chai';
import { loadDecks, setDeckFK, loadCards } from './fixtures';

describe('fixtures', () => {
  it('loadDecks', () => {
    loadDecks().then(decks => {
      expect(decks.length).to.equal(2);

      decks.forEach((deck, idx) => {
        expect(deck.question.text).to.equal(`Question ${idx + 1}`);
      });
    });
  });

  it('setDeckFK', () => {
    const deckId = '555';
    setDeckFK(deckId).forEach(card => {
      expect(card.deckId).to.equal(deckId);
    });
  });

  it('loadCards', () => {
    loadCards().then(cards => {
      expect(cards.length).to.equal(4);
    });
  });
});

