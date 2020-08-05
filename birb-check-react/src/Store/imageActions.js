const axios = require('axios').default;

const ROOT_URL = 'http://localhost:4000/images/';

const headerConfig = {
  headers: { 'auth-token': window.localStorage.getItem('jwt') },
};
const postConfig = {
  headers: {
    'auth-token': window.localStorage.getItem('jwt'),
    'Content-Type': 'multipart/form-data',
  },
};

export const fetchImages = () => {
  return (dispatch) => {
    return axios
      .get(ROOT_URL, headerConfig)
      .then((rawData) =>
        dispatch({
          type: '[Images] Fetch Images',
          data: rawData.data,
        }),
      )
      .catch((err) =>
        dispatch({ type: '[Action] Error', msg: 'Unable to GET data' }),
      );
  };
};

export const uploadImage = (image) => {
  return (dispatch) => {
    return axios
      .post(ROOT_URL, image, postConfig)
      .then((rawData) =>
        dispatch({
          type: '[Images] Post Image',
          data: rawData.data,
        }),
      )
      .catch((err) =>
        dispatch({ type: '[Action] Error', msg: 'Unable to POST data' }),
      );
  };
};
