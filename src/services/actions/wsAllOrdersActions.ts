import {
  WS_ALL_ORDERS_CONNECTION_CLOSED,
  WS_ALL_ORDERS_CONNECTION_ERROR,
  WS_ALL_ORDERS_CONNECTION_START,
  WS_ALL_ORDERS_CONNECTION_SUCCESS,
  WS_GET_ALL_ORDERS
} from '../constants/wsAllOrders';
import {TWsOrders} from '../types/data';

export interface IWsAllOrdersConnectionStartAction {
  readonly type: typeof WS_ALL_ORDERS_CONNECTION_START
}

export interface IWsAllOrdersConnectionSuccessAction {
  readonly type: typeof WS_ALL_ORDERS_CONNECTION_SUCCESS
}

export interface IWsAllOrdersConnectionErrorAction {
  readonly type: typeof WS_ALL_ORDERS_CONNECTION_ERROR
}

export interface IWsAllOrdersConnectionClosedAction {
  readonly type: typeof WS_ALL_ORDERS_CONNECTION_CLOSED
}

export interface IWsGetAllOrdersAction {
  readonly type: typeof WS_GET_ALL_ORDERS
  readonly payload: TWsOrders
}

export type TWsAllOrdersActions =
  | IWsAllOrdersConnectionStartAction
  | IWsAllOrdersConnectionSuccessAction
  | IWsAllOrdersConnectionErrorAction
  | IWsAllOrdersConnectionClosedAction
  | IWsGetAllOrdersAction;

export const wsAllOrdersConnectionStart = (): IWsAllOrdersConnectionStartAction => ({
  type: WS_ALL_ORDERS_CONNECTION_START
});

export const wsAllOrdersConnectionSuccess = (): IWsAllOrdersConnectionSuccessAction => ({
  type: WS_ALL_ORDERS_CONNECTION_SUCCESS
});

export const wsAllOrdersConnectionError = (): IWsAllOrdersConnectionErrorAction => ({
  type: WS_ALL_ORDERS_CONNECTION_ERROR
});

export const wsAllOrdersConnectionClosed = (): IWsAllOrdersConnectionClosedAction => ({
  type: WS_ALL_ORDERS_CONNECTION_CLOSED
});

export const wsGetAllOrders = (orders: TWsOrders): IWsGetAllOrdersAction => ({
  type: WS_GET_ALL_ORDERS,
  payload: orders
});
