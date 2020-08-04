import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import rootReducer from './Store/rootReducer';

import App from './App';
import * as serviceWorker from './serviceWorker';

import { fetchPosts } from './Store/postActions';
import { getUser } from './Store/userActions';
import { fetchImages } from './Store/imageActions';

let store = createStore(rootReducer, applyMiddleware(thunk));
store.dispatch(fetchPosts());
store.dispatch(fetchImages());

if (!window.localStorage.getItem('_id')) {
  store.dispatch(getUser());
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
