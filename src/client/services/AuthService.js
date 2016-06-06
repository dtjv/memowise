// TODO: replace this with fetch using polyfill maybe
// native fetch did NOT work to set cookies
import $ from 'jquery';

export default class AuthService {
  static signIn(email, password) {
    return new Promise((resolve, reject) => {
      $.ajax({
        method: 'POST',
        url: '/api/auth/sign-in',
        data: { email, password },
        dataType: 'json',
      }).then(
        res => resolve(res),
        err => reject(err)
      );
    });
  }

  static verify() {
    return new Promise((resolve, reject) => {
      $.get('/api/auth/verify').then(
        res => resolve(res),
        err => reject(err)
      );
    });
  }

  static checkAuthorized() {
    return fetch('/api/auth/check-authorized', { credentials: 'same-origin' })
      .then(response => response.json());
  }

  static signOut() {
    return new Promise((resolve, reject) => {
      $.get('/api/auth/sign-out').then(
        res => resolve(res),
        err => reject(err)
      );
    });
  }
}
