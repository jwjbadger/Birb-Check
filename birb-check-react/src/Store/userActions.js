const axios = require('axios').default;

const ROOT_URL = 'http://localhost:4000/users/';

export const login = (name, password) => {
  return (dispatch) => {
    return axios
      .post(ROOT_URL + 'login', { name: name, password: password })
      .then((rawData) => {
        return dispatch({
          type: '[Users] Login',
          data: rawData.data.token,
        });
      })
      .catch((err) =>
        dispatch({ type: '[Action] Error', msg: 'Unable to GET data' }),
      );
  };
};
