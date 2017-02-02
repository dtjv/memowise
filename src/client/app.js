/* global window document */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import isEmpty from 'is-empty-object';
import fetch from 'isomorphic-fetch';

import './assets/styles/app.scss';

import { store, history } from './store';

import App from './components/App';
import Splash from './components/Splash';
import SignUp from './containers/SignUp';
import SignIn from './containers/SignIn';
import Profile from './containers/Profile';
import Dashboard from './containers/Dashboard';
import StudyDeck from './containers/StudyDeck';
import { signOut, setUser } from './actions';

const fetchUser = () =>
  fetch('/api/user', {
    credentials: 'same-origin',
  })
  .then(res => res.json());

const isLoggedIn = (nextState, replace, callback) => {
  fetchUser()
  .then((user) => {
    if (isEmpty(user)) {
      store.dispatch(signOut());
      replace('/sign-in');
    }
    callback();
  });
};

fetchUser().then((user) => {
  if (!isEmpty(user)) {
    store.dispatch(setUser(user));
    history.push('/dashboard');
  }
});

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Splash} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/profile" component={Profile} onEnter={isLoggedIn} />
        <Route path="/dashboard" component={Dashboard} onEnter={isLoggedIn} />
        <Route
          path="/decks/:deckId/study"
          component={StudyDeck}
          onEnter={isLoggedIn}
        />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app'),
);

window.store = store;
