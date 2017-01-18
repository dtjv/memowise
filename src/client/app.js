/* global document */

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// redux modules
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import * as reducers from './reducers';

import './assets/styles/app.scss';

// components
import App from './components/App';
import Splash from './components/Splash';
import CreateAccount from './components/CreateAccount';
import SignIn from './containers/SignIn';
import SignOut from './containers/SignOut';
import Profile from './containers/Profile';
import Dashboard from './containers/Dashboard';
import StudyDeck from './containers/StudyDeck';
import { verifyAuthentication, fetchDecks } from './actions';

// services
import Auth from './services/AuthService';

reducers.routing = routerReducer;

const store = createStore(combineReducers(reducers), applyMiddleware(thunk));
const history = syncHistoryWithStore(browserHistory, store);

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
