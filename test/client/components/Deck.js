import React from 'react';
import { expect } from 'chai';
import { shallow, render } from 'enzyme';
import Deck from 'client/components/Deck';
import ProgressBar from 'client/components/ProgressBar';
import DeckLastPlayed from 'client/components/DeckLastPlayed';

describe('Deck', () => {
  const selectDeck = () => new Promise(() => {}, () => {});

  it('should render one card-item', () => {
    const deck = { _id: '111', name: 'Math' };

    const wrapper = shallow(
      <Deck
        deck={deck}
        idx={0}
        selectDeck={selectDeck}
      />);
    expect(wrapper.find('.card-item').length).to.equal(1);
  });

  it('should render a deck name', () => {
    const deck = { _id: '111', name: 'Math' };

    const wrapper = render(
      <Deck
        deck={deck}
        idx={0}
        selectDeck={selectDeck}
      />);
    expect(wrapper.find('.card-title').text()).to.equal(deck.name);
  });

  it('should render a study button', () => {
    const deck = { _id: '111', name: 'Math' };

    const wrapper = render(
      <Deck
        deck={deck}
        idx={0}
        selectDeck={selectDeck}
      />);
    expect(wrapper.find('button').text()).to.equal('Study');
  });


  it('should render a progress bar', () => {
    const deck = { _id: '111', name: 'Math' };

    const wrapper = shallow(
      <Deck
        deck={deck}
        idx={0}
        selectDeck={selectDeck}
      />);
    expect(wrapper.find(ProgressBar)).to.exist;
  });

  it('should render last played date', () => {
    const deck = { _id: '111', name: 'Math' };

    const wrapper = render(
      <Deck
        deck={deck}
        idx={0}
        selectDeck={selectDeck}
      />);
    expect(wrapper.find(DeckLastPlayed)).to.exist;
  });
});
