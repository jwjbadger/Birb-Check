const axios = require('axios').default;

const ROOT_URL = 'http://localhost:4000/images/';

const headerConfig = {
  headers: { 'auth-token': window.localStorage.getItem('jwt') },
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
