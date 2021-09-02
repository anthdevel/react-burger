import {getOrder} from '../api';
import {GET_ORDER_NUMBER_ERROR, GET_ORDER_NUMBER_REQUEST, GET_ORDER_NUMBER_SUCCESS} from '../constants/order';

export const getOrderNumberFetch = (orderList: any) => (dispatch: any) => {
  dispatch({type: GET_ORDER_NUMBER_REQUEST});

  getOrder(orderList)
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