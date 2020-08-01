const axios = require('axios').default;

const ROOT_URL = 'http://localhost:4000/posts/';

const headerConfig = {
  headers: { 'auth-token': window.localStorage.getItem('jwt') },
};

export const fetchPosts = () => {
  return (dispatch) => {
    return axios
      .get(ROOT_URL, headerConfig)
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
      .post(ROOT_URL, post, headerConfig)
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
      .delete(ROOT_URL + _id, headerConfig)
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
      .patch(ROOT_URL + _id, post, headerConfig)
      .then((rawData) =>
        dispatch({ type: '[Posts] Patch Post', index: index, post: post }),
      )
      .catch((err) =>
        dispatch({ type: '[Action] Error', msg: 'Unable to PATCH data' }),
      );
  };
};

export const postComment = (_id, comment) => {
  return (dispatch) => {
    return axios
      .post(ROOT_URL + 'comments/' + _id, comment, headerConfig)
      .then((rawData) =>
        dispatch({
          type: '[Posts] Post Comment',
        }).then(),
      )
      .catch((err) =>
        dispatch({ type: '[Action] Error', msg: 'Unable to POST data' }),
      );
  };
};

export const patchComment = (_id, index, comment) => {
  return (dispatch) => {
    return axios
      .patch(ROOT_URL + 'comments/' + _id, comment, headerConfig)
      .then((rawData) =>
        dispatch({
          type: '[Posts] Patch Comment',
          _id: _id,
          index: index,
          body: comment.body,
        }),
      )
      .catch((err) =>
        dispatch({ type: '[Action] Error', msg: 'Unable to PATCH data' }),
      );
  };
};

export const deleteComment = (_id, index) => {
  return (dispatch) => {
    return axios
      .delete(ROOT_URL + 'comments/' + _id, headerConfig)
      .then((rawData) =>
        dispatch({
          type: '[Posts] Delete Comment',
          _id: _id,
          index: index,
        }),
      )
      .catch((err) =>
        dispatch({ type: '[Action] Error', msg: 'Unable to DELETE data' }),
      );
  };
};

export const upvotePost = (index, _id) => {
  return (dispatch) => {
    return axios
      .patch(ROOT_URL + 'vote/up/' + _id, {}, headerConfig)
      .then((rawData) =>
        dispatch({ type: '[Post] Upvote', index: index, post: rawData.data }),
      )
      .catch((err) =>
        dispatch({ type: '[Action] Error', msg: 'Unable to UPVOTE post' }),
      );
  };
};

export const downvotePost = (index, _id) => {
  return (dispatch) => {
    return axios
      .patch(ROOT_URL + 'vote/down/' + _id, {}, headerConfig)
      .then((rawData) =>
        dispatch({ type: '[Post] Downvote', index: index, post: rawData.data }),
      )
      .catch((err) =>
        dispatch({ type: '[Action] Error', msg: 'Unable to UPVOTE post' }),
      );
  };
};

export const unvotePost = (index, _id) => {
  return (dispatch) => {
    return axios
      .patch(ROOT_URL + 'vote/remove/' + _id, {}, headerConfig)
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

export const upvoteComment = (index, _id, commentId) => {
  return (dispatch) => {
    return axios
      .patch(
        ROOT_URL + 'vote/comments/up/' + _id,
        { commentId: commentId },
        headerConfig,
      )
      .then((rawData) =>
        dispatch({
          type: '[Post] Upvote Comment',
          index: index,
          commentId: commentId,
          upvotes: rawData.data.upvotes,
        }),
      )
      .catch((err) =>
        dispatch({ type: '[Action] Error', msg: 'Unable to UPVOTE comment' }),
      );
  };
};

export const downvoteComment = (index, _id, commentId) => {
  return (dispatch) => {
    return axios
      .patch(
        ROOT_URL + 'vote/comments/down/' + _id,
        { commentId: commentId },
        headerConfig,
      )
      .then((rawData) =>
        dispatch({
          type: '[Post] Downvote Comment',
          index: index,
          commentId: commentId,
          downvotes: rawData.data.downvotes,
        }),
      )
      .catch((err) =>
        dispatch({ type: '[Action] Error', msg: 'Unable to DOWNVOTE comment' }),
      );
  };
};

export const unvoteComment = (index, _id, commentId) => {
  return (dispatch) => {
    return axios
      .patch(
        ROOT_URL + 'vote/comments/un/' + _id,
        { commentId: commentId },
        headerConfig,
      )
      .then((rawData) =>
        dispatch({
          type: '[Post] Unvote Comment',
          index: index,
          commentId: commentId,
          upvotes: rawData.data.upvotes,
          downvotes: rawData.data.downvotes,
        }),
      )
      .catch((err) =>
        dispatch({ type: '[Action] Error', msg: 'Unable to UNVOTE comment' }),
      );
  };
};
