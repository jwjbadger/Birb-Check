const intialState = {
  posts: [],
  data: null,
  error: '',
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case '[Posts] Fetch Posts':
      return { ...state, posts: action.data };
    case '[Action] Error':
      return { ...state, error: action.msg };
    default:
      return state;
  }
};

export default reducer;
