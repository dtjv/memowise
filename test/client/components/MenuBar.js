import React from 'react';
import { expect } from 'chai';
import { render, shallow } from 'enzyme';
import MenuBar from 'client/components/MenuBar';

describe('MenuBar', () => {
  const signOut = () => {};

  it('should render non-mobile menu bar', () => {
    const wrapper = shallow(
      <MenuBar
        user={{ name: 'Hans' }}
        signOut={signOut}
      />,
    );
    expect(wrapper.find('#nav-mobile').length).to.equal(0);
    expect(wrapper.find('.hide-on-med-and-down').length).to.equal(1);
  });

  it('should render mobile menu bar', () => {
    const wrapper = shallow(
      <MenuBar
        user={{ name: 'Hans' }}
        mobile
        signOut={signOut}
      />,
    );
    expect(wrapper.find('#nav-mobile').length).to.equal(1);
    expect(wrapper.find('.hide-on-med-and-down').length).to.equal(0);
  });

  it('should render user & sign-out when passed a user (non-mobile)', () => {
    const user = { name: 'Hans' };
    const wrapper = render(<MenuBar user={user} signOut={signOut} />);
    expect(wrapper.find('#user').text()).to.equal(user.name);
    expect(wrapper.find('#menu-signout').length).to.equal(1);
  });

  it('should render sign-in and create account w/o user (non-mobile)', () => {
    const user = { name: undefined };
    const wrapper = render(<MenuBar user={user} signOut={signOut} />);
    expect(wrapper.find('#menu-signin').length).to.equal(1);
    expect(wrapper.find('#menu-signup').text()).to.equal('Create Account');
  });

  it('should render user & sign-out when passed a user (mobile)', () => {
    const user = { name: 'Hans' };
    const wrapper = render(
      <MenuBar
        user={user}
        mobile
        signOut={signOut}
      />,
    );
    expect(wrapper.find('#user').text()).to.equal(user.name);
    expect(wrapper.find('#menu-signout').length).to.equal(1);
  });

  it('should render sign-in and create account w/o user (mobile)', () => {
    const user = { name: undefined };
    const wrapper = render(
      <MenuBar
        user={user}
        mobile
        signOut={signOut}
      />,
    );
    expect(wrapper.find('#menu-signin').length).to.equal(1);
    expect(wrapper.find('#menu-signup').text()).to.equal('Create Account');
  });
});
