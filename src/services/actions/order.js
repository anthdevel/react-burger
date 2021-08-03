import {URL_ORDER} from '../../utils';

export const GET_ORDER_NUMBER_REQUEST = 'GET_ORDER_NUMBER_REQUEST';
export const GET_ORDER_NUMBER_SUCCESS = 'GET_ORDER_NUMBER_SUCCESS';
export const GET_ORDER_NUMBER_ERROR = 'GET_ORDER_NUMBER_ERROR';

export const getOrderNumber = (orderList) => dispatch => {
  dispatch({type: GET_ORDER_NUMBER_REQUEST});

  fetch(URL_ORDER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ingredients: orderList
      })
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(`Ошибка ${response.status}`);
    })
    .then(response => dispatch({
        type: GET_ORDER_NUMBER_SUCCESS,
        payload: response.order.number
      })
    )
    .catch(error => {
      dispatch({
        type: GET_ORDER_NUMBER_ERROR,
      });

      console.error(error);
    });
};