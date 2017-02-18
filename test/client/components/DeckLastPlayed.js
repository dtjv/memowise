import React from 'react';
import { expect } from 'chai';
import { render } from 'enzyme';
import DeckLastPlayed from 'client/components/DeckLastPlayed';

describe('DeckLastPlayed', () => {
  it('should render never studied', () => {
    const wrapper = render(<DeckLastPlayed date={undefined} />);
    expect(wrapper.text()).to.equal('Last Studied: Never');
  });
});
