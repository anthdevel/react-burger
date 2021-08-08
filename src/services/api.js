const BASE_URL = 'https://norma.nomoreparties.space/api';

export const getIngredients = () => {
  return fetch(`${BASE_URL}/ingredients`);
}

export const getOrder = (orderList) => {
  return fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ingredients: orderList
    })
  })
}

export const restorePassword = (email) => {
  return fetch(`${BASE_URL}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email})
  })
}

export const resetPassword = (form) => {
  return fetch(`${BASE_URL}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
}





