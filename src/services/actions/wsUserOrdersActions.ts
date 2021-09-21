import {
  WS_USER_ORDERS_CONNECTION_START,
  WS_USER_ORDERS_CONNECTION_SUCCESS,
  WS_USER_ORDERS_CONNECTION_ERROR,
  WS_USER_ORDERS_CONNECTION_CLOSED,
  WS_GET_USER_ORDERS,
} from '../constants/wsUserOrders';
import {TWsOrders} from '../types/data';

export interface IWsUserOrdersConnectionStartAction {
  readonly type: typeof WS_USER_ORDERS_CONNECTION_START;
}

export interface IWsUserOrdersConnectionSuccessAction {
  readonly type: typeof WS_USER_ORDERS_CONNECTION_SUCCESS;
}

export interface IWsUsersOrdersConnectionErrorAction {
  readonly type: typeof WS_USER_ORDERS_CONNECTION_ERROR;
}

export interface IWsUsersOrdersConnectionClosedAction {
  readonly type: typeof WS_USER_ORDERS_CONNECTION_CLOSED;
}

export interface IWsGetUserOrdersAction {
  readonly type: typeof WS_GET_USER_ORDERS;
  readonly payload: TWsOrders;
}

export type TWsUserOrdersActions =
  | IWsUserOrdersConnectionStartAction
  | IWsUserOrdersConnectionSuccessAction
  | IWsUsersOrdersConnectionErrorAction
  | IWsUsersOrdersConnectionClosedAction
  | IWsGetUserOrdersAction;

export const wsUserOrdersConnectionStart = (): IWsUserOrdersConnectionStartAction => ({
  type: WS_USER_ORDERS_CONNECTION_START
});

export const wsUserOrdersConnectionSuccess = (): IWsUserOrdersConnectionSuccessAction => ({
  type: WS_USER_ORDERS_CONNECTION_SUCCESS
});

export const wsUserOrdersConnectionError = (): IWsUsersOrdersConnectionErrorAction => ({
  type: WS_USER_ORDERS_CONNECTION_ERROR
});

export const wsUserOrdersConnectionClosed = (): IWsUsersOrdersConnectionClosedAction => ({
  type: WS_USER_ORDERS_CONNECTION_CLOSED
});

export const wsGetUserOrders = (orders: TWsOrders): IWsGetUserOrdersAction => ({
    type: WS_GET_USER_ORDERS,
    payload: orders
});