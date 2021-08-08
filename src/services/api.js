import {ACCESS_TOKEN} from '../utils/consts';
import {getCookie} from '../utils';

const BASE_URL = 'https://norma.nomoreparties.space/api';

export const getIngredients = () => {
  return fetch(`${BASE_URL}/ingredients`);
};

export const getOrder = (orderList) => {
  return fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ingredients: orderList
    })
  });
};

export const restorePassword = (email) => {
  return fetch(`${BASE_URL}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email})
  });
};

export const resetPassword = (form) => {
  return fetch(`${BASE_URL}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  });
};

export const registerUser = (form) => {
  return fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(form),
  });
};

export const loginUser = (form) => {
  return fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(form),
  });
};

export const logoutUser = (token) => {
  return fetch(`${BASE_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({token}),
  });
};

export const getUser = () => {
  return fetch(`${BASE_URL}/auth/user`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie(ACCESS_TOKEN),
    },
  });
};

export const updateToken = (token) => fetch(`${BASE_URL}/auth/token`, {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify({token}),
});





