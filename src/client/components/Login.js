import React from 'react';
import { Link } from 'react-router';

const Login = () => (
  <div className="container">
    <br />
    <br />
    <h1 className="center"> Login </h1>
    <div className="row">
      <form className="col s12">
        <div className="row">
          <div className="input-field col s6">
            <input id="first_name" type="text" className="validate" />
            <label htmlFor="first_name">First Name</label>
          </div>
          <div className="input-field col s6">
            <input id="last_name" type="text" className="validate" />
            <label htmlFor="last_name">Last Name</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input id="password" type="password" className="validate" />
            <label htmlFor="password">Password</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input id="email" type="email" className="validate" />
            <label htmlFor="email">Email</label>
          </div>
        </div>
      </form>
    </div>
    <div className="row center">
      <Link to="/dashboard" className="btn-large blue lighten-2"> Login </Link>
    </div>
  </div>
);

export default Login;

