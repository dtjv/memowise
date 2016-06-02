/* global WINDOW document */
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// redux modules
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import * as reducers from './reducers';

// application components
import App from './components/App';
import Splash from './components/Splash';
import SignUp from './components/SignUp';
import SignIn from './containers/SignIn';
import SignOut from './containers/SignOut';
import StudyDeck from './components/StudyDeck';
import { verifyAuthentication, fetchDecks } from './actions';
import Dashboard from './containers/Dashboard';

// application configuration
import { DEBUG } from './config';

reducers.routing = routerReducer;

const store = createStore(combineReducers(reducers), applyMiddleware(thunk));
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Splash} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signout" component={SignOut} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/decks/:deckId/study" component={StudyDeck} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);

if (DEBUG) {
  store.subscribe(() => console.log(store.getState()));
}

store.dispatch(verifyAuthentication());
store.dispatch(fetchDecks());

// just for inspection
window.store = store;
