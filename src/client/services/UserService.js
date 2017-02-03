import fetch from 'isomorphic-fetch';
import isEmpty from 'is-empty-object';
import { signOut, setUser } from '../actions';
import { isError } from './ErrorService';

export const fetchUser = (baseUrl = '') =>
  fetch(`${baseUrl}/api/user`, {
    credentials: 'same-origin',
  })
  .then(res => res.json());

export const authorizeUser = store =>
  (nextState, replace, callback) => {
    fetchUser()
      .then((user) => {
        if (isEmpty(user)) {
          store.dispatch(signOut());
          replace('/sign-in');
        }
        callback();
      });
  };

export const rehydrateUser = (store, history) =>
  fetchUser()
    .then((user) => {
      if (!isEmpty(user)) {
        store.dispatch(setUser(user));
        history.push('/dashboard');
      }
    });

export const signUp = (user, baseUrl = '') => {
  const payload = JSON.stringify(user);

  return fetch(`${baseUrl}/api/user/sign-up`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Content-length': payload.length,
    },
    credentials: 'same-origin',
    body: payload,
  })
  .then(res => res.json())
  .then(res => (isError(res) ? Promise.reject(res) : Promise.resolve(res)));
};
