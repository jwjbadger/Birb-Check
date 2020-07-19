import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import rootReducer from './Store/reducers';

import App from './App';
import * as serviceWorker from './serviceWorker';

import { fetchPosts } from './Store/actions';

let store = createStore(rootReducer, applyMiddleware(thunk));
store.dispatch(fetchPosts());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
