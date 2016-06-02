import React from 'react';
import { Link } from 'react-router';
const http = require('http');

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
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
    const newUser = {
      name: this.state.username,
      email: this.state.email,
      password: this.state.password
      
    }
    $.post('/api/signup', newUser, (data, status) => {console.log(status);
    })
    .fail((err, status) => console.log('err', status))
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
              <input ref="username" type="text" className="validate" value={this.state.username} onChange={this.handleUserNameInput.bind(this)} />
              <label htmlFor="username"> Username </label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s4">
              <input ref="email" type="email" className="validate" value={this.state.email} onChange={this.handleEmailInput.bind(this)}/>
              <label htmlFor="email"> Email </label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s4">
              <input ref="password" type="password" className="validate" value={this.state.password} onChange={this.handlePasswordInput.bind(this)}/>
              <label htmlFor="password"> Password </label>
            </div>
          </div>
    
        </form>
      </div>
      <div className="row center">
        <Link to="/dashboard" onClick={this.createAccount.bind(this)} className="btn-large blue lighten-2"> Create Account </Link>
      </div>
    </div>
    )
  }
}

export default SignUp;