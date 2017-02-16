import React from 'react';
import { expect } from 'chai';
import { shallow, render } from 'enzyme';
import Dashboard from 'client/components/Dashboard';

describe('Dashboard', () => {
  const fetchDecks = () => new Promise(() => {}, () => {});

  it('should render one container', () => {
    const wrapper = shallow(
      <Dashboard
        decks={[]}
        fetchDecks={fetchDecks}
      />);
    expect(wrapper.find('.container').length).to.equal(1);
  });

  it('should render a title', () => {
    const wrapper = render(
      <Dashboard
        decks={[]}
        fetchDecks={fetchDecks}
      />);
    expect(wrapper.find('h4').text()).to.equal(' Dashboard ');
  });

  it('should render 3 decks', () => {
    const decks = [
      { _id: 1, name: 'deck1' },
      { _id: 2, name: 'deck2' },
      { _id: 3, name: 'deck3' },
    ];
    const wrapper = shallow(
      <Dashboard
        decks={decks}
        fetchDecks={fetchDecks}
      />);
    expect(wrapper.find('.card-columns').children().length).to.equal(3);
  });
});
