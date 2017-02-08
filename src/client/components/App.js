import React from 'react';
import Toolbar from './Toolbar';

const App = ({ children }) => (
  <div>
    <Toolbar />
    {children}
  </div>
);

App.propTypes = {
  children: React.PropTypes.node,
};

App.defaultProps = {
  children: null,
};

export default App;
