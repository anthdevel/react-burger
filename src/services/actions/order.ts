import {getOrderDetails, getOrderNumber, updateToken} from '../api';
import {
  CLEAR_ORDER_DETAILS,
  GET_ORDER_DETAILS_ERROR,
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_NUMBER_ERROR,
  GET_ORDER_NUMBER_REQUEST,
  GET_ORDER_NUMBER_SUCCESS
} from '../constants/order';
import {AppDispatch, AppThunk} from '../types';
import {TOrder} from '../types/data';
import {getCookie, setCookie} from '../../utils';
import {ETokenVariant} from '../../types/enums';

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
  readonly payload: TOrder
}

export interface IGetOrderDetailsErrorAction {
  readonly type: typeof GET_ORDER_DETAILS_ERROR
}

export interface IClearOrderDetailsAction {
  readonly type: typeof CLEAR_ORDER_DETAILS
}

export type TOrderActions =
  | IGetOrderNumberRequestAction
  | IGetOrderNumberSuccessAction
  | IGetOrderNumberErrorAction
  | IGetOrderDetailsRequestAction
  | IGetOrderDetailsSuccessAction
  | IGetOrderDetailsErrorAction
  | IClearOrderDetailsAction;

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

export const getOrderDetailsSuccessAction = (order: TOrder): IGetOrderDetailsSuccessAction => ({
  type: GET_ORDER_DETAILS_SUCCESS,
  payload: order
});

export const getOrderDetailsErrorAction = (): IGetOrderDetailsErrorAction => ({
  type: GET_ORDER_DETAILS_ERROR
});

export const clearOrderDetailsAction = (): IClearOrderDetailsAction => ({
  type: CLEAR_ORDER_DETAILS
});


export const getOrderNumberFetch: AppThunk = (orderList: string[]) => (dispatch: AppDispatch) => {
  dispatch(getOrderNumberRequestAction());

  getOrderNumber(orderList)
    .then(response => response.json())
    .then(response => {
      if (response.success) {
        dispatch(getOrderNumberSuccessAction(response.order.number));

        return response;
      }

      return updateToken(getCookie(ETokenVariant.RefreshToken))
        .then(response => response.json())
        .then(response => {
          if (response.success) {
            setCookie(ETokenVariant.AccessToken, response.accessToken.split('Bearer ')[1]);
            setCookie(ETokenVariant.RefreshToken, response.refreshToken);

            return getOrderNumber(orderList)
              .then(response => response.json())
              .then(response => {
                if (response.success) {
                  dispatch(getOrderNumberSuccessAction(response.order.number));

                  return response;
                }
              });
          }

          return response;
        });
    })
    .catch(error => {
      dispatch(getOrderNumberErrorAction());

      console.error(error);
    });
};

export const getOrderDetailsFetch: AppThunk = (id) => (dispatch: AppDispatch) => {
  dispatch(getOrderDetailsRequestAction());

  getOrderDetails(id)
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(`Ошибка ${response.status}`);
    })
    .then(response => dispatch(getOrderDetailsSuccessAction(response.orders[0])))
    .catch(error => {
      dispatch(getOrderDetailsErrorAction());

      console.error(error);
    });
};