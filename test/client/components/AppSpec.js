import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import App from '../../../src/client/components/App';

describe('App', () => {
  it('should render one <Toolbar /> component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Toolbar').exists()).to.equal(true);
  });

  it('should render all children', () => {
    const wrapper = shallow(
      <App>
        <div id="child" />
      </App>,
    );
    expect(wrapper.contains(<div id="child" />)).to.equal(true);
  });
});
