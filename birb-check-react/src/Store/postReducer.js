const intialState = {
  posts: [],
  data: null,
  error: '',
};

const postReducer = (state = intialState, action) => {
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
          if (index !== postIndex) return item;

          return {
            ...state.posts[index],
            comments: state.posts[index].comments.map((item, index) => {
              if (index !== action.index) return item;

              return {
                ...state.posts[postIndex].comments[index],
                body: action.body,
              };
            }),
          };
        }),
      };
    case '[Posts] Delete Comment':
      const parentIndex = state.posts.findIndex(
        (value) => value._id === action._id,
      );
      return {
        ...state,
        posts: state.posts.map((item, index) => {
          if (index !== parentIndex) return item;

          return {
            ...state.posts[index],
            comments: state.posts[index].comments.filter(
              (item, index) => index !== action.index,
            ),
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
    case '[Post] Upvote Comment':
      const commentIndex = state.posts[action.index].comments.findIndex(
        (value) => value._id === action.commentId,
      );
      return {
        ...state,
        posts: state.posts.map((item, index) => {
          if (index !== action.index) return item;

          return {
            ...state.posts[index],
            comments: state.posts[action.index].comments.map((item, index) => {
              if (index !== commentIndex) return item;

              return {
                ...state.posts[action.index].comments[commentIndex],
                upvotes: state.upvotes,
              };
            }),
          };
        }),
      };
    case '[Post] Downvote Comment':
      const indexForComment = state.posts[action.index].comments.findIndex(
        (value) => value._id === action.commentId,
      );
      return {
        ...state,
        posts: state.posts.map((item, index) => {
          if (index !== action.index) return item;

          return {
            ...state.posts[index],
            comments: state.posts[index].comments.map((item, index) => {
              if (index !== indexForComment) return item;

              return {
                ...state.posts[action.index].comments[indexForComment],
                downvotes: state.downvotes,
              };
            }),
          };
        }),
      };
    case '[Action] Error':
      return { ...state, error: action.msg };
    default:
      return state;
  }
};
export default postReducer;
