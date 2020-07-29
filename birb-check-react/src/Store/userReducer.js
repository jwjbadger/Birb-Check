const intialState = {
  user: {},
};

const userReducer = (state = intialState, action) => {
  switch (action.type) {
    case '[Users] Login':
      console.log(action);
      return { ...state };
    default:
      return { ...state };
  }
};

export default userReducer;
