import React from 'react';
import { Link } from 'react-router';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      email: null,
      password: null,
      confirmPassword: null
    }
  }

  handleUserNameInput(event) {
    this.setState({username: event.target.value})
  }

  handleEmailInput(event) {
    this.setState({email: event.target.value})
  }

  handlePasswordInput(event) {
    this.setState({password: event.target.value})
  }

  handleConfirmPasswordInput() {
    this.setState({confirmPassword: event.target.value})
  }

  createAccount(event) {
    event.preventDefault();
    
  }

  render() {
    <div className="container">
      <br />
      <br />
      <h1 className="center"> Create Account </h1>
      <div className="row">
        <form className="col s12" onSubmit={this.createAccount}>
          <div className="row">
            <div className="input-field col s4">
              <input ref="username" type="text" className="validate" value={this.state.username} onChange={this.handleUserNameInput} />
              <label htmlFor="username"> Username </label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s4">
              <input ref="email" type="email" className="validate" value={this.state.email} onChange={this.handleEmailInput}/>
              <label htmlFor="email"> Email </label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s4">
              <input ref="password" type="password" className="validate" value={this.state.password} onChange={this.handlePasswordInput}/>
              <label htmlFor="password"> Password </label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s4">
              <input ref="confirmPassword" type="password" className="validate" value={this.state.confirmPassword} onChange={this.handleConfirmPasswordInput}/>
              <label htmlFor="password"> Confirm Password </label>
            </div>
          </div>
        </form>
      </div>
      <div className="row center">
        <Link to="/dashboard" className="btn-large blue lighten-2"> Create Account </Link>
      </div>
    </div>
    );
  }
}

export default SignUp;

