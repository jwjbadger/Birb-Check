import postReducer from './postReducer';
import userReducer from './userReducer';
import { combineReducers } from 'redux';

export default combineReducers({
  posts: postReducer,
  user: userReducer,
});
