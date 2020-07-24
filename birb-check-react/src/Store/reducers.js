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
    case '[Posts] Delete Post':
      return {
        ...state,
        posts: state.posts.filter((item, index) => index !== action.index),
      };
    case '[Posts] Patch Post':
      return {
        ...state,
        posts: state.posts.map((item, index) => {
          if (index !== action.index) {
            return item;
          }
          return {
            ...state.posts[index],
            title: action.post.title,
            body: action.post.description,
          };
        }),
      };

    case '[Posts] Post Comment':
      return { ...state }; // We can't assign _id to comments locally and they are needed as keys in lists. Instead of calling the fetchPosts() action, we will let the Post view fetch it's own post (something it wouuld have to do anyways). This will only show up in the post view because you can only see comments in the post view.
    case '[Posts] Patch Comment':
      const postIndex = state.posts.findIndex(
        (value) => value._id === action._id,
      );
      return {
        ...state,
        posts: state.posts.map((item, index) => {
          if (index !== postIndex) {
            return item;
          }
          return {
            ...state.posts[postIndex],
            comments: state.posts[postIndex].comments.map((item, index) => {
              if (index !== action.index) {
                return item;
              }
              return {
                ...state.posts[postIndex].comments[index],
                body: action.body,
              };
            }),
          };
        }),
      };

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
