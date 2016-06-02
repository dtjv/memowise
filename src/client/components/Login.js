import React from 'react';
import Auth from '../services/AuthService';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  handleEmailChange(e) {
    this.setState({ ...this.state, email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ ...this.state, password: e.target.value });
  }

  // This will be called when the user clicks on the login button
  login(e) {
    e.preventDefault();
    // Here, we call an external AuthService. We’ll create it in the next step
    Auth.login(this.state.email, this.state.password)
      .catch(function(err) {
        console.log('Error logging in', err);
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
                <input id="email" type="email" className="validate" onChange={this.handleEmailChange.bind(this)} />
                <label htmlFor="email">Email Address</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="password" type="password" className="validate" onChange={this.handlePasswordChange.bind(this)} />
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </form>
        </div>
        <div className="row center">
          <button onClick={this.login.bind(this)} className="btn-large blue lighten-2">Sign In</button>
        </div>
      </div>
    );
  }
}

export default Login;

