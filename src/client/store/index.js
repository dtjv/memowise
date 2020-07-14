// redux modules
import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { browserHistory } from "react-router";
import { syncHistoryWithStore, routerReducer } from "react-router-redux";
import { persistStore, autoRehydrate } from "redux-persist";
import { asyncSessionStorage } from "redux-persist/storages";
import * as reducers from "../reducers";

const enhancer = compose(applyMiddleware(thunk), autoRehydrate());

export const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer,
  }),
  enhancer
);

persistStore(store, { storage: asyncSessionStorage, blacklist: ["routing"] });

export const history = syncHistoryWithStore(browserHistory, store);
