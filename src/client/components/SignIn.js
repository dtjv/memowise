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
    this.signIn = this.signIn.bind(this);
  }

  handleEmailChange(e) {
    this.setState({ ...this.state, email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ ...this.state, password: e.target.value });
  }

  signIn(e) {
    e.preventDefault();
    // Here, we call an external AuthService. We’ll create it in the next step
    Auth.signIn(this.state.email, this.state.password)
      .then(user => {
        // TODO: refactor to use push action creator
        this.props.onSignIn(user);
        browserHistory.push('/dashboard');
      });
  }

  render() {
    return (
      <div className="container">
        <h1 className="center">Sign In</h1>
        <div className="row">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <input
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
                  id="password"
                  type="password"
                  className="validate"
                  onChange={this.handlePasswordChange}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </form>
        </div>
        <div className="row center">
          <button onClick={this.signIn} className="btn-large blue lighten-2">Sign In</button>
        </div>
      </div>
    );
  }
}

SignIn.propTypes = {
  onSignIn: React.PropTypes.object,
};

export default SignIn;

