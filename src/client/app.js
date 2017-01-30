/* global document */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';

import './assets/styles/app.scss';

import { store, history } from './store';

import App from './components/App';
import Splash from './components/Splash';
import CreateAccount from './components/CreateAccount';
import SignIn from './containers/SignIn';
import SignOut from './containers/SignOut';
import Profile from './containers/Profile';
import Dashboard from './containers/Dashboard';
import StudyDeck from './containers/StudyDeck';
import { verifyAuthentication, fetchDecks } from './actions';

import Auth from './services/AuthService';

const isAuthorized = (nextState, replace, next) => {
  Auth.checkAuthorized()
    .then((check) => {
      if (check.loggedIn) {
        next();
      } else {
        replace('/sign-in');
        next();
      }
    });
};

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Splash} />
        <Route path="/create-account" component={CreateAccount} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-out" component={SignOut} />
        <Route path="/profile" component={Profile} onEnter={isAuthorized} />
        <Route path="/dashboard" component={Dashboard} onEnter={isAuthorized} />
        <Route
          path="/decks/:deckId/study"
          component={StudyDeck}
          onEnter={isAuthorized}
        />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app'),
);

store.dispatch(verifyAuthentication());
store.dispatch(fetchDecks());
