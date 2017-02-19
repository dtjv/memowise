import React from 'react';
import { expect } from 'chai';
import { render } from 'enzyme';
import Profile from 'client/components/Profile';

describe('Profile', () => {
  const user = {
    _id: '1',
    name: 'Hans',
    email: 'hans@yahoo.com',
  };

  it('should render one container component', () => {
    const wrapper = render(<Profile user={user} />);
    expect(wrapper.find('.container').length).to.equal(1);
  });

  it('should render user name, email and id', () => {
    const wrapper = render(<Profile user={user} />);

    expect(wrapper.find('h5').text())
      .to.equal(user.name);
    expect(wrapper.find('h5').next().text())
      .to.equal(user.email);
    expect(wrapper.find('.container').children().last().text())
      .to.equal(user._id);
  });
});
