import {getCookie} from '../utils';
import {ETokenVariant} from '../types/enums';

const BASE_URL = 'https://norma.nomoreparties.space/api';

export const getIngredients = () => {
  return fetch(`${BASE_URL}/ingredients`);
};

export const getOrder = (orderList: any) => {
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

export const restorePassword = (email: any) => {
  return fetch(`${BASE_URL}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email})
  });
};

export const resetPassword = (form: any) => {
  return fetch(`${BASE_URL}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  });
};

export const registerUser = (form: any) => {
  return fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(form),
  });
};

export const loginUser = (form: any) => {
  return fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(form),
  });
};

export const logoutUser = (token: any) => {
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
      Authorization: 'Bearer ' + getCookie(ETokenVariant.AccessToken),
    },
  });
};

export const updateUser = (form: any) => {
  return fetch(`${BASE_URL}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie(ETokenVariant.AccessToken),
    },
    body: JSON.stringify(form),
  })
};

export const updateToken = (token: any) => fetch(`${BASE_URL}/auth/token`, {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify({token}),
});





