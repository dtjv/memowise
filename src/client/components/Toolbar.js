/* eslint-disable jsx-a11y/href-no-hash */
import React from 'react';
import { Link } from 'react-router';
import MenuBar from '../containers/MenuBar';

const Toolbar = () => (
  <header>
    <div className="navbar-fixed">
      <nav role="navigation" className="orange accent-4">
        <div className="nav-wrapper container">
          <Link to="/" id="logo-container" className="brand-logo">
            <i className="material-icons">home</i>
          </Link>
          <MenuBar />
          <MenuBar mobile />
          <a href="#" data-activates="nav-mobile" className="button-collapse">
            <i className="material-icons">menu</i>
          </a>
        </div>
      </nav>
    </div>
  </header>
);

export default Toolbar;
