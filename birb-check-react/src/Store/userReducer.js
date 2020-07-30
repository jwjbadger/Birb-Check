const jwt = require('jsonwebtoken');

const intialState = {
  user: { _id: '' },
};

const userReducer = (state = intialState, action) => {
  switch (action.type) {
    case '[Users] Login':
      window.localStorage.setItem('jwt', action.data);
      return {
        ...state,
        user: { ...state.user, _id: jwt.decode(action.data)._id },
      };
    case '[Users] Get User':
      return {
        ...state,
        user: {
          ...state.user,
          _id: jwt.decode(window.localStorage.getItem('jwt'))._id,
          name: action.data.name,
        },
      };
    default:
      return { ...state };
  }
};

export default userReducer;
