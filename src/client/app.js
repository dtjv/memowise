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

// application components
import App from './components/App';
import Splash from './components/Splash';
import Login from './components/Login';
import Decks from './components/Decks';
import Deck from './components/Deck';

reducers.routing = routerReducer;

const store = createStore(combineReducers(reducers), applyMiddleware(thunk));
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Splash} />
        <Route path="/login" component={Login} />
        <Route path="/decks" component={Decks} />
        <Route path="/decks/:deckId" component={Deck} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
