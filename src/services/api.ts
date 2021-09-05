import {getCookie} from '../utils';
import {ETokenVariant} from '../types/enums';

const BASE_URL = 'https://norma.nomoreparties.space/api';

export const getIngredients = () => {
  return fetch(`${BASE_URL}/ingredients`);
};

export const getOrderNumber = (orderList: string[]) => {
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

export const getOrderDetails = (id: string) => {
  return fetch(`${BASE_URL}/orders/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
};

export const restorePassword = (email: string) => {
  return fetch(`${BASE_URL}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email})
  });
};

export type TResetPasswordForm = {
  password: string
  token: string
}

export const resetPassword = (form: TResetPasswordForm) => {
  return fetch(`${BASE_URL}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  });
};

export type TUserForm = {
  email: string
  password: string
  name: string
}

export const registerUser = (form: TUserForm) => {
  return fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(form),
  });
};

export type TLoginUserForm = {
  email: string
  password: string
}

export const loginUser = (form: TLoginUserForm) => {
  return fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(form),
  });
};

export const logoutUser = (token?: string) => {
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

export const updateUser = (form: TUserForm) => {
  return fetch(`${BASE_URL}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie(ETokenVariant.AccessToken),
    },
    body: JSON.stringify(form),
  });
};

export const updateToken = (token?: string) => fetch(`${BASE_URL}/auth/token`, {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify({token}),
});





