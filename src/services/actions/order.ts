import {getOrderDetails, getOrderNumber} from '../api';
import {
  GET_ORDER_DETAILS_ERROR,
  GET_ORDER_DETAILS_REQUEST, GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_NUMBER_ERROR,
  GET_ORDER_NUMBER_REQUEST,
  GET_ORDER_NUMBER_SUCCESS
} from '../constants/order';
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

export interface IGetOrderDetailsRequestAction {
  readonly type: typeof GET_ORDER_DETAILS_REQUEST
}

export interface IGetOrderDetailsSuccessAction {
  readonly type: typeof GET_ORDER_DETAILS_SUCCESS
  readonly payload: any
}

export interface IGetOrderDetailsErrorAction {
  readonly type: typeof GET_ORDER_DETAILS_ERROR
}

export type TOrderActions =
  | IGetOrderNumberRequestAction
  | IGetOrderNumberSuccessAction
  | IGetOrderNumberErrorAction
  | IGetOrderDetailsRequestAction
  | IGetOrderDetailsSuccessAction
  | IGetOrderDetailsErrorAction;

export const getOrderNumberRequestAction = (): IGetOrderNumberRequestAction => ({
  type: GET_ORDER_NUMBER_REQUEST
});

export const getOrderNumberSuccessAction = (num: number): IGetOrderNumberSuccessAction => ({
  type: GET_ORDER_NUMBER_SUCCESS,
  payload: num
});

export const getOrderNumberErrorAction = (): IGetOrderNumberErrorAction => ({
  type: GET_ORDER_NUMBER_ERROR
});


export const getOrderDetailsRequestAction = (): IGetOrderDetailsRequestAction => ({
  type: GET_ORDER_DETAILS_REQUEST
});

export const getOrderDetailsSuccessAction = (order: any): IGetOrderDetailsSuccessAction => ({
  type: GET_ORDER_DETAILS_SUCCESS,
  payload: order
});

export const getOrderDetailsErrorAction = (): IGetOrderDetailsErrorAction => ({
  type: GET_ORDER_DETAILS_ERROR
});

export const getOrderNumberFetch: AppThunk = (orderList: string[]) => (dispatch: AppDispatch) => {
  dispatch(getOrderNumberRequestAction());

  getOrderNumber(orderList)
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

export const getOrderDetailsFetch: AppThunk = (id: string) => (dispatch: AppDispatch) => {
  dispatch(getOrderDetailsRequestAction());

  getOrderDetails(id)
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(`Ошибка ${response.status}`);
    })
    .then((response) => dispatch(getOrderDetailsSuccessAction(response.orders[0])),
    )
    .catch(error => {
      dispatch(getOrderDetailsErrorAction());

      console.error(error);
    });
};