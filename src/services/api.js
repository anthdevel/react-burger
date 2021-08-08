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





