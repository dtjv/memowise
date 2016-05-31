/* global document */
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/App';
import Splash from './components/Splash';
import Login from './components/Login';
import Decks from './components/Decks';
import Deck from './components/Deck';

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Splash} />
      <Route path="/login" component={Login} />
      <Route path="/decks" component={Decks} />
      <Route path="/decks/:deckId" component={Deck} />
    </Route>
  </Router>,
  document.getElementById('app')
);
