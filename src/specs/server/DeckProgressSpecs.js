import { dummyDecks, dummyPlays } from '../sample_data/sampleData.js';
import app from '../sample_test/sampleTest.js'; 
import { expect } from 'chai';

describe('deck-progress', function() {
  it('should correctly have an function named `getCard`', function() {
    expect(app).to.be.a('function');
  });
});
