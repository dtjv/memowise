import React from 'react';
import { Link } from 'react-router';

const Splash = () => (
  <div className="container">
    <br />
    <br />
    <h1 className="center"> WonkyFlash </h1>
    <div className="row center">
      <Link to="/dashboard" className="btn-large blue lighten-2"> Go! </Link>
    </div>
  </div>
);

export default Splash;
