import React from 'react';
import { browserHistory } from 'react-router';
import Auth from '../services/AuthService';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleError = this.handleError.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  handleEmailChange(e) {
    this.setState({ ...this.state, email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ ...this.state, password: e.target.value });
  }

  handleError(err) {
    // TODO: don't use global
    Materialize.toast(err.responseJSON.message, 5000);
  }

  signIn(e) {
    e.preventDefault();
    // Here, we call an external AuthService. We’ll create it in the next step
    Auth.signIn(this.state.email, this.state.password)
      .then(user => {
        // TODO: refactor to use push action creator
        this.props.onSignIn(user);
        browserHistory.push('/dashboard');
      })
      .catch(this.handleError);
  }

  render() {
    return (
      <div className="container">
        <h1 className="center">Sign In</h1>
        {this.state.error ? <div className="row red">
          <div clasName="col s12 white-text">{this.state.error.message}</div>
        </div> : null}
        <div className="row">
          <form className="col s8 offset-s2" onSubmit={this.signIn}>
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
                <button type="submit" className="btn-large cyan lighten-3">
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
  onSignIn: React.PropTypes.func,
};

export default SignIn;

