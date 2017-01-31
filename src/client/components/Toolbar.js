import React from 'react';
import { Link } from 'react-router';
import MenuBar from '../containers/MenuBar';

const Toolbar = () => (
  <header>
    <div className="navbar-fixed">
      <nav role="navigation" className="cyan lighten-3">
        <div className="nav-wrapper container">
          <Link to="/" id="logo-container" className="brand-logo">
            <i className="material-icons">home</i>
          </Link>
          <MenuBar />
          <MenuBar mobile />
          <button data-activates="nav-mobile" className="button-collapse">
            <i className="material-icons">menu</i>
          </button>
        </div>
      </nav>
    </div>
  </header>
);

export default Toolbar;
