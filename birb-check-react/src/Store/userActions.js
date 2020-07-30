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
        dispatch({ type: '[Action] Error', msg: 'Unable to POST data' }),
      );
  };
};

export const register = (name, password) => {
  return (dispatch) => {
    return axios
      .post(ROOT_URL + 'register', { name: name, password: password })
      .then(() => {
        return login(name, password);
      })
      .catch((err) =>
        dispatch({ type: '[Action] Error', msg: 'Unable to POST data' }),
      );
  };
};

export const getUser = () => {
  return (dispatch) => {
    return axios
      .get(ROOT_URL, {
        headers: { 'auth-token': window.localStorage.getItem('jwt') },
      })
      .then((rawData) =>
        dispatch({
          type: '[Users] Get User',
          data: rawData.data,
        }),
      );
  };
};
