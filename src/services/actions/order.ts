import {getOrder} from '../api';
import {GET_ORDER_NUMBER_ERROR, GET_ORDER_NUMBER_REQUEST, GET_ORDER_NUMBER_SUCCESS} from '../constants/order';
import {AppDispatch, AppThunk} from '../types';

export interface IGetOrderNumberRequestAction {
  readonly type: typeof GET_ORDER_NUMBER_REQUEST
}

export interface IGetOrderNumberSuccessAction {
  readonly type: typeof GET_ORDER_NUMBER_SUCCESS
  readonly payload: number
}

export interface IGetOrderNumberErrorAction {
  readonly type: typeof GET_ORDER_NUMBER_ERROR
}

export type TOrderActions =
  | IGetOrderNumberRequestAction
  | IGetOrderNumberSuccessAction
  | IGetOrderNumberErrorAction;

export const getOrderNumberRequestAction = (): IGetOrderNumberRequestAction => ({
  type: GET_ORDER_NUMBER_REQUEST
})

export const getOrderNumberSuccessAction = (num: number): IGetOrderNumberSuccessAction => ({
  type: GET_ORDER_NUMBER_SUCCESS,
  payload: num
})

export const getOrderNumberErrorAction = (): IGetOrderNumberErrorAction => ({
  type: GET_ORDER_NUMBER_ERROR
})

export const getOrderNumberFetch: AppThunk = (orderList: string[]) => (dispatch: AppDispatch) => {
  dispatch(getOrderNumberRequestAction());

  getOrder(orderList)
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(`Ошибка ${response.status}`);
    })
    .then(response => dispatch(getOrderNumberSuccessAction(response.order.number))
    )
    .catch(error => {
      dispatch(getOrderNumberErrorAction());

      console.error(error);
    });
};