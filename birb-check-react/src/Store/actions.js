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
