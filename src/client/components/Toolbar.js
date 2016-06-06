import React from 'react';
import AuthBar from '../containers/AuthBar';

const Toolbar = () => (
  <header>
    <div className="navbar-fixed">
      <nav role="navigation" className="cyan lighten-3">
        <div className="nav-wrapper container">
          <a id="logo-container" href="/" className="brand-logo">
            <i className="material-icons">home</i>
          </a>
          <AuthBar />
          <AuthBar mobile />
          <a href="#" data-activates="nav-mobile" className="button-collapse">
            <i className="material-icons">menu</i>
          </a>
        </div>
      </nav>
    </div>
  </header>
);

export default Toolbar;
