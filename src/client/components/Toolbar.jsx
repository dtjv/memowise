import React from 'react';
import AuthBar from '../containers/AuthBar';
import { Link } from 'react-router';

const Toolbar = () => (
  <header>
    <div className="navbar-fixed">
      <nav role="navigation" className="cyan lighten-3">
        <div className="nav-wrapper container">
          <Link to="/" id="logo-container" className="brand-logo">
            <i className="material-icons">home</i>
          </Link>
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
