/* global Materialize */

import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';

const handleError = (err) => {
  Materialize.toast(
    `Failed to create account: ${err.responseJSON.message}`,
    4000,
  );
};

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
    };

    this.handleNameInput = this.handleNameInput.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleNameInput(event) {
    this.setState({ name: event.target.value });
  }

  handleEmailInput(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordInput(event) {
    this.setState({ password: event.target.value });
  }

  handleSignUp(event) {
    event.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };

    this.props.signUp(newUser)
      .then(() => this.props.signIn(newUser.email, newUser.password))
      .then(() => browserHistory.push('/dashboard'))
      .catch(handleError);
  }

  render() {
    return (
      <div className="container">
        <br />
        <br />
        <h1 className="center">Create Account</h1>
        <div className="row">
          <form className="col s8 offset-s2" onSubmit={this.handleSignUp}>
            <div className="row">
              <div className="input-field col s12">
                <input
                  required
                  type="text"
                  className="validate"
                  value={this.state.name}
                  pattern="^[a-zA-Z\s]+$"
                  title="please enter your full name"
                  onChange={this.handleNameInput}
                />
                <label htmlFor="name">Name</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  required
                  type="email"
                  className="validate"
                  value={this.state.email}
                  onChange={this.handleEmailInput}
                />
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  required
                  type="password"
                  className="validate"
                  value={this.state.password}
                  pattern=".{7,}"
                  title="must be more than 6 characters long"
                  onChange={this.handlePasswordInput}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="row center">
              <div className="col s12">
                <button type="submit" className="btn-large cyan lighten-3">
                  Create Account
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
  signUp: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
};

export default SignUp;
