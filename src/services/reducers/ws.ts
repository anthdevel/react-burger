import {sortByDate} from '../../utils';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_FEED_ORDERS,
  WS_GET_PROFILE_ORDERS
} from '../constants/ws';
import {TWsActions} from '../actions/ws';
import {Nullable} from '../../types/types';
import {TOrder} from '../types/data';

export type TWsState = {
  readonly wsConnected: boolean
  readonly feedOrders: TOrder[]
  readonly profileOrders: TOrder[]
  readonly total: Nullable<number>
  readonly totalToday: Nullable<number>
}

export const initialState: TWsState = {
  wsConnected: false,
  feedOrders: [],
  profileOrders: [],
  total: null,
  totalToday: null,
};

export const wsReducer = (state = initialState, action: TWsActions): TWsState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsConnected: true
      };
    }
    case WS_CONNECTION_ERROR: {
      return {
        ...state,
        wsConnected: false
      };
    }
    case WS_CONNECTION_CLOSED: {
      return {
        ...state,
        wsConnected: false
      };
    }
    case WS_GET_FEED_ORDERS: {
      return {
        ...state,
        feedOrders: action.payload.orders.sort(sortByDate),
        total: action.payload.total,
        totalToday: action.payload.totalToday
      };
    }
    case WS_GET_PROFILE_ORDERS: {
      return {
        ...state,
        profileOrders: action.payload.orders.sort(sortByDate),
        total: action.payload.total,
        totalToday: action.payload.totalToday
      };
    }

    default: {
      return state;
    }
  }
};