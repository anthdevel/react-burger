import {URL_USER_REGISTER} from '../../utils';
import {resetPassword, restorePassword} from '../api';

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR';
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
      dispatch({
        type: REGISTER_USER_ERROR,
      });

      console.error(error);
    });
};

export const restorePasswordFetch = (email) => dispatch => {
  dispatch({type: RESTORE_PASSWORD_REQUEST});

  restorePassword(email)
    .then(response => {
      if (response.ok) {
        dispatch({
          type: RESTORE_PASSWORD_SUCCESS
        });

        return response;
      }

      return Promise.reject(`Ошибка ${response.status}`);
    })
    .catch(error => {
      dispatch({
        type: RESTORE_PASSWORD_ERROR,
      });

      console.error(error);
    });
};

export const resetPasswordFetch = (form) => dispatch => {
  dispatch({type: RESET_PASSWORD_REQUEST});

  resetPassword(form)
    .then(response => {
      if (response.ok) {
        dispatch({
          type: RESET_PASSWORD_SUCCESS
        });

        return response;
      }

      return Promise.reject(`Ошибка ${response.status}`);
    })
    .catch(error => {
      dispatch({
        type: RESET_PASSWORD_ERROR,
      });

      console.error(error);
    });
};