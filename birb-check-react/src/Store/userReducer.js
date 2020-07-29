const intialState = {
  user: {},
};

const userReducer = (state = intialState, action) => {
  switch (action.type) {
    case '[Users] Login':
      window.localStorage.setItem('jwt', action.data);
      return { ...state };
    default:
      return { ...state };
  }
};

export default userReducer;
