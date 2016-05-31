import React from 'react';


const Toolbar = () => (
  <header>
    <div className="navbar-fixed">
      <nav role="navigation" className="green lighten-2">
        <div className="nav-wrapper container">
          <a id="logo-container" href="/" className="brand-logo">
            <i className="material-icons">home</i>
          </a>
          <ul className="right hide-on-med-and-down">
            <li><a href="/login">Login</a></li>
            <li><a href="/about">About</a></li>
          </ul>
          <ul id="nav-mobile" className="side-nav">
            <li><a href="/login">Login</a></li>
            <li><a href="/about">About</a></li>
          </ul>
          <a href="#" data-activates="nav-mobile" className="button-collapse">
            <i className="material-icons">menu</i>
          </a>
        </div>
      </nav>
    </div>
  </header>
);

export default Toolbar;
