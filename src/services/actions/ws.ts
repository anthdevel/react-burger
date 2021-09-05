import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_FEED_ORDERS,
  WS_GET_PROFILE_ORDERS,
  WS_PROFILE_CONNECTION_START
} from '../constants/ws';
import {TOrders} from '../types/data';

export interface IWsConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START;
}

export interface IWsProfileConnectionStartAction {
  readonly type: typeof WS_PROFILE_CONNECTION_START;
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

export interface IWsGetProfileOrdersAction {
  readonly type: typeof WS_GET_PROFILE_ORDERS;
  readonly payload: TOrders
}

export type TWsActions =
  | IWsConnectionStartAction
  | IWsProfileConnectionStartAction
  | IWsConnectionSuccessAction
  | IWsConnectionErrorAction
  | IWsConnectionClosedAction
  | IWsGetFeedOrdersAction
  | IWsGetProfileOrdersAction

export const wsConnectionStart = (): IWsConnectionStartAction => {
  return {
    type: WS_CONNECTION_START
  };
};

export const wsProfileConnectionStart = (): IWsProfileConnectionStartAction => {
  return {
    type: WS_PROFILE_CONNECTION_START
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

export const wsGetProfileOrders = (message: TOrders): IWsGetProfileOrdersAction => {
  return {
    type: WS_GET_PROFILE_ORDERS,
    payload: message
  };
};