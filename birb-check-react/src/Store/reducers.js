const intialState = {
  posts: [],
  data: null,
  error: '',
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case '[Posts] Fetch Posts':
      return { ...state, posts: action.data };
    case '[Posts] Post Post':
      return { ...state, posts: [...state.posts, action.data] };
    case '[Post] Upvote':
      return {
        ...state,
        posts: state.posts.map((item, index) => {
          if (index !== action.index) {
            return item;
          }
          return {
            ...action.post,
          };
        }),
      };
    case '[Post] Downvote':
      return {
        ...state,
        posts: state.posts.map((item, index) => {
          if (index !== action.index) {
            return item;
          }
          return {
            ...action.post,
          };
        }),
      };
    case '[Post] Remove Vote':
      return {
        ...state,
        posts: state.posts.map((item, index) => {
          if (index !== action.index) {
            return item;
          }
          return {
            ...action.post,
          };
        }),
      };
    case '[Action] Error':
      return { ...state, error: action.msg };
    default:
      return state;
  }
};

export default reducer;
