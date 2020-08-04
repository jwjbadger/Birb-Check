import postReducer from './postReducer';
import userReducer from './userReducer';
import imageReducer from './imageReducer';
import { combineReducers } from 'redux';

export default combineReducers({
  posts: postReducer,
  user: userReducer,
  images: imageReducer,
});
