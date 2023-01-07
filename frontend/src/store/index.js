import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import sessionReducer from './sessionReducer.js'
import organizationReducer from './organizationReducer.js';
import channelReducer from './channelReducer.js';
import dmMessageChannelReducer from './dmMessageChannelReducer.js';
import messagesReducer from './messagesReducer.js';

const rootReducer = combineReducers({
  session: sessionReducer,
  organization: organizationReducer,
  channel: channelReducer,
  dmMessageChannel: dmMessageChannelReducer,
  messages: messagesReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
