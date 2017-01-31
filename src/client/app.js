/* global window document */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import isEmpty from 'is-empty-object';

import './assets/styles/app.scss';

import { store, history } from './store';

import App from './components/App';
import Splash from './components/Splash';
import SignUp from './containers/SignUp';
import SignIn from './containers/SignIn';
import Profile from './containers/Profile';
import Dashboard from './containers/Dashboard';
import StudyDeck from './containers/StudyDeck';
import { fetchUser, fetchDecks } from './actions';

store.dispatch(fetchUser());
store.dispatch(fetchDecks());

const isLoggedIn = (nextState, replace) => {
  if (isEmpty(store.getState().user)) {
    replace('/sign-in');
  }
};

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
