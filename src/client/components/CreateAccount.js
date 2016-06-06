import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { signIn } from '../actions';
import $ from 'jquery';
import Auth from '../services/AuthService';

const mapStateToProps = props => (props);
const mapDispatchToProps = (dispatch) => ({
  onSignIn: user => {
    dispatch(signIn(user));
  },
});

class CreateAccount extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
    };

    this.handleError = this.handleError.bind(this);
    this.handleNameInput = this.handleNameInput.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.createAccount = this.createAccount.bind(this);
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

  handleError(err) {
    Materialize.toast(`Failed to create account: ${err.responseJSON.message}`, 4000);
  }

  createAccount(event) {
    event.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };
    $.post('/api/auth/create-account', newUser, () => {
      Auth.signIn(this.state.email, this.state.password)
        .then(user => {
          this.props.onSignIn(user);
          browserHistory.push('/dashboard');
        })
        .catch(this.handleError);
    })
    .fail(err => this.handleError(err));
  }

  render() {
    return (
      <div className="container">
        <br />
        <br />
        <h1 className="center">Create Account</h1>
        <div className="row">
          <form className="col s8 offset-s2" onSubmit={this.createAccount}>
            <div className="row">
              <div className="input-field col s12">
                <input
                  required
                  ref="name"
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
                  ref="email"
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
                  ref="password"
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

CreateAccount.propTypes = {
  onSignIn: React.PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);
