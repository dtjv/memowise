import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
    };
    this.handleUserNameInput = this.handleUserNameInput.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.createAccount = this.createAccount.bind(this);
  }

  handleUserNameInput(event) {
    this.setState({ username: event.target.value });
  }

  handleEmailInput(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordInput(event) {
    this.setState({ password: event.target.value });
  }

  createAccount(event) {
    event.preventDefault();
    const newUser = {
      name: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };
    $.post('/api/signup', newUser, (data, status) => status)
    .fail((err, status) => status);
  }

  render() {
    return (
      <div className="container">
        <br />
        <br />
        <h1 className="center"> Create Account </h1>
        <div className="row">
          <form className="col s12" id="signupform">
            <div className="row">
              <div className="input-field col s4">
                <input
                  ref="username"
                  type="text"
                  className="validate"
                  value={this.state.username}
                  onChange={this.handleUserNameInput}
                />
                <label htmlFor="username"> Username </label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s4">
                <input
                  ref="email"
                  type="email"
                  className="validate"
                  value={this.state.email}
                  onChange={this.handleEmailInput}
                />
                <label htmlFor="email"> Email </label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s4">
                <input
                  ref="password"
                  type="password"
                  className="validate"
                  value={this.state.password}
                  onChange={this.handlePasswordInput}
                />
                <label htmlFor="password"> Password </label>
              </div>
            </div>
          </form>
        </div>
        <div className="row center">
          <Link
            to="/dashboard"
            onClick={this.createAccount}
            className="btn-large blue lighten-2"
          > Create Account </Link>
        </div>
      </div>
    );
  }
}

export default SignUp;
