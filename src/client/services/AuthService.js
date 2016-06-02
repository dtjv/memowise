import * as actions from '../actions';

export default class AuthService {
  static login(email, password) {
    return fetch('/api/auth/login', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({ email, password }),
    }).then(response => response.json()).then(user => actions.signIn(user));
  }

  static verify() {
    return fetch('/api/auth/verify').then(data => console.log(data));
  }
}
