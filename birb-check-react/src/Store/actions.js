const axios = require('axios').default;

const ROOT_URL = 'http://localhost:4000/';

export const fetchPosts = () => {
  return (dispatch) => {
    return axios
      .get(ROOT_URL + 'posts')
      .then((rawData) =>
        dispatch({
          type: '[Posts] Fetch Posts',
          data: rawData.data.sort(
            (a, b) =>
              b.upvotes.length -
              b.downvotes.length -
              (a.upvotes.length - a.downvotes.length),
          ),
        }),
      )
      .catch((err) =>
        dispatch({ type: '[Action] Error', msg: 'Unable to GET data' }),
      );
  };
};

export const postPost = (post) => {
  return (dispatch) => {
    return axios
      .post(ROOT_URL + 'posts', post)
      .then((rawData) =>
        dispatch({ type: '[Posts] Post Post', data: rawData.data }),
      )
      .catch((err) =>
        dispatch({ type: '[Action] Error', msg: 'Unable to POST data' }),
      );
  };
};

export const deletePost = (_id, index) => {
  return (dispatch) => {
    return axios
      .delete(ROOT_URL + 'posts/' + _id)
      .then((rawData) =>
        dispatch({ type: '[Posts] Delete Post', index: index }),
      )
      .catch((err) =>
        dispatch({ type: '[Action] Error', msg: 'Unable to DELETE data' }),
      );
  };
};

export const patchPost = (_id, index, post) => {
  return (dispatch) => {
    return axios
      .patch(ROOT_URL + 'posts/' + _id, post)
      .then((rawData) =>
        dispatch({ type: '[Posts] Patch Post', index: index, post: post }),
      )
      .catch((err) =>
        dispatch({ type: '[Action] Error', msg: 'Unable to PATCH data' }),
      );
  };
};

export const upvotePost = (index, _id, voter) => {
  return (dispatch) => {
    return axios
      .patch(ROOT_URL + 'posts/vote/up/' + _id, { voter: voter })
      .then((rawData) =>
        dispatch({ type: '[Post] Upvote', index: index, post: rawData.data }),
      )
      .catch((err) =>
        dispatch({ type: '[Action] Error', msg: 'Unable to UPVOTE post' }),
      );
  };
};

export const downvotePost = (index, _id, voter) => {
  return (dispatch) => {
    return axios
      .patch(ROOT_URL + 'posts/vote/down/' + _id, { voter: voter })
      .then((rawData) =>
        dispatch({ type: '[Post] Downvote', index: index, post: rawData.data }),
      )
      .catch((err) =>
        dispatch({ type: '[Action] Error', msg: 'Unable to UPVOTE post' }),
      );
  };
};

export const unvotePost = (index, _id, voter) => {
  return (dispatch) => {
    return axios
      .patch(ROOT_URL + 'posts/vote/remove/' + _id, { voter: voter })
      .then((rawData) =>
        dispatch({
          type: '[Post] Remove Vote',
          index: index,
          post: rawData.data,
        }),
      )
      .catch((err) =>
        dispatch({
          type: '[Action] Error',
          msg: 'Unable to REMOVE VOTE on post',
        }),
      );
  };
};
