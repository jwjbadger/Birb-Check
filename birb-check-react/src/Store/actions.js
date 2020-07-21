const axios = require('axios').default;

const ROOT_URL = 'http://localhost:4000/';

export const fetchPosts = () => {
  return (dispatch) => {
    return axios
      .get(ROOT_URL + 'posts')
      .then((rawData) =>
        dispatch({ type: '[Posts] Fetch Posts', data: rawData.data }),
      )
      .catch((err) =>
        dispatch({ type: '[Action] Error', msg: 'Unable to GET data' }),
      );
  };
};

export const upvotePost = (index, _id, voter) => {
  return (dispatch) => {
    return axios
      .patch(ROOT_URL + '/vote/up/' + _id, { voter: voter })
      .then((rawData) =>
        dispatch({ type: '[Post] Upvote', index: index, post: rawData.data }),
      )
      .catch((err) =>
        dispatch({ type: '[Action] Error', msg: 'Unable to UPVOTE post' }),
      );
  };
};
