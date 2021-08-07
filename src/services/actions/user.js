import {URL_FORGOT_PASSWORD, URL_USER_REGISTER} from '../../utils';

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR';
export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR';

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

export const forgotUserPassword = (email) => dispatch => {
  dispatch({type: FORGOT_PASSWORD_REQUEST});

  fetch(URL_FORGOT_PASSWORD, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email})
  })
    .then(response => {
      if (response.ok) {
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS
        });

        return response.json();
      }

      return Promise.reject(`Ошибка ${response.status}`);
    })
    .catch(error => {
      dispatch({
        type: FORGOT_PASSWORD_ERROR,
      });

      console.error(error);
    });
};