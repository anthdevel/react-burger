import {deleteCookie, setCookie, URL_USER_REGISTER} from '../../utils';
import {getUser, loginUser, logoutUser, resetPassword, restorePassword} from '../api';
import {ACCESS_TOKEN, REFRESH_TOKEN} from '../../utils/consts';

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_ERROR = 'GET_USER_ERROR';

export const LOGOUT_USER_REQUEST = 'LOGOUT_USER_REQUEST';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';
export const LOGOUT_USER_ERROR = 'LOGOUT_USER_ERROR';

export const RESTORE_PASSWORD_REQUEST = 'RESTORE_PASSWORD_REQUEST';
export const RESTORE_PASSWORD_SUCCESS = 'RESTORE_PASSWORD_SUCCESS';
export const RESTORE_PASSWORD_ERROR = 'RESTORE_PASSWORD_ERROR';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR';

export const registerUser = (user) => dispatch => {
  dispatch({type: REGISTER_USER_REQUEST});

  fetch(URL_USER_REGISTER, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(`Ошибка ${response.status}`);
    })
    .then(response => dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: response.user
      })
    )
    .catch(error => {
      dispatch({type: REGISTER_USER_ERROR});

      console.error(error);
    });
};

export const restorePasswordFetch = (email) => dispatch => {
  dispatch({type: RESTORE_PASSWORD_REQUEST});

  restorePassword(email)
    .then(response => {
      if (response.ok) {
        dispatch({type: RESTORE_PASSWORD_SUCCESS});

        return response;
      }

      return Promise.reject(`Ошибка ${response.status}`);
    })
    .catch(error => {
      dispatch({type: RESTORE_PASSWORD_ERROR});

      console.error(error);
    });
};

export const resetPasswordFetch = (form) => dispatch => {
  dispatch({type: RESET_PASSWORD_REQUEST});

  resetPassword(form)
    .then(response => {
      if (response.ok) {
        dispatch({type: RESET_PASSWORD_SUCCESS});

        return response;
      }

      return Promise.reject(`Ошибка ${response.status}`);
    })
    .catch(error => {
      dispatch({type: RESET_PASSWORD_ERROR});

      console.error(error);
    });
};

export const loginUserFetch = (form) => dispatch => {
  dispatch({type: LOGIN_USER_REQUEST});

  loginUser(form)
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(`Ошибка ${response.status}`);
    })
    .then(({accessToken, refreshToken, user}) => {
      if (accessToken) {
        setCookie(ACCESS_TOKEN, accessToken.split('Bearer ')[1]);
      }

      if (refreshToken) {
        setCookie(REFRESH_TOKEN, refreshToken);
      }

      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
      });
    })
    .catch(error => {
      dispatch({type: LOGIN_USER_ERROR});

      console.error(error);
    });
};

export const logoutUserFetch = (token) => dispatch => {
  dispatch({type: LOGOUT_USER_REQUEST});

  logoutUser(token)
    .then(response => {
      if (response.ok) {
        deleteCookie(ACCESS_TOKEN);
        deleteCookie(REFRESH_TOKEN);
        dispatch({type: LOGOUT_USER_SUCCESS});

        return response;
      }

      return Promise.reject(`Ошибка ${response.status}`);
    })
    .catch(error => {
      dispatch({type: LOGOUT_USER_ERROR,});

      console.error(error);
    });
};

export const getUserFetch = () => dispatch => {
  dispatch({type: GET_USER_REQUEST});

  getUser()
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(`Ошибка ${response.status}`);
    })
    .then(response => dispatch({
        type: GET_USER_SUCCESS,
        payload: response.user
      })
    )
    .catch(error => {
      dispatch({type: GET_USER_ERROR});

      console.error(error);
    });
};