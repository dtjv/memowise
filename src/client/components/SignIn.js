/* global Materialize */

import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { handleError } from '../services/ErrorService';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  handleEmailChange(e) {
    this.setState({ ...this.state, email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ ...this.state, password: e.target.value });
  }

  handleSignIn(e) {
    e.preventDefault();
    this.props.signIn(this.state.email, this.state.password)
      .then(() => browserHistory.push('/dashboard'))
      .catch(handleError);
  }

  render() {
    return (
      <div className="container">
        <h1 className="center">Sign In</h1>
        <div className="row">
          <form className="col s8 offset-s2" onSubmit={this.handleSignIn}>
            <div className="row">
              <div className="input-field col s12">
                <input
                  required
                  id="email"
                  type="email"
                  className="validate"
                  onChange={this.handleEmailChange}
                />
                <label htmlFor="email">Email Address</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  required
                  id="password"
                  type="password"
                  pattern=".{7,}"
                  className="validate"
                  title="must be more than 6 characters long"
                  onChange={this.handlePasswordChange}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="row center">
              <div className="col s12">
                <button name="submit" type="submit" className="btn btn-large blue">
                  Sign In
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired,
};

export default SignIn;

