import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_FEED_ORDERS,
} from '../constants/ws';
import {TOrders} from '../types/data';

export interface IWsConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START;
}

export interface IWsConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWsConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
}

export interface IWsConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWsGetFeedOrdersAction {
  readonly type: typeof WS_GET_FEED_ORDERS;
  readonly payload: TOrders
}

export type TWsActions =
  | IWsConnectionStartAction
  | IWsConnectionSuccessAction
  | IWsConnectionErrorAction
  | IWsConnectionClosedAction
  | IWsGetFeedOrdersAction;

export const wsConnectionStart = (): IWsConnectionStartAction => {
  return {
    type: WS_CONNECTION_START
  };
};

export const wsConnectionSuccess = (): IWsConnectionSuccessAction => {
  return {
    type: WS_CONNECTION_SUCCESS
  };
};

export const wsConnectionError = (): IWsConnectionErrorAction => {
  return {
    type: WS_CONNECTION_ERROR
  };
};

export const wsConnectionClosed = (): IWsConnectionClosedAction => {
  return {
    type: WS_CONNECTION_CLOSED
  };
};

export const wsGetFeedOrders = (message: TOrders): IWsGetFeedOrdersAction => {
  return {
    type: WS_GET_FEED_ORDERS,
    payload: message
  };
};