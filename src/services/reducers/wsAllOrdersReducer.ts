import {
  WS_ALL_ORDERS_CONNECTION_SUCCESS,
  WS_ALL_ORDERS_CONNECTION_ERROR,
  WS_ALL_ORDERS_CONNECTION_CLOSED,
  WS_GET_ALL_ORDERS,
} from '../constants/wsAllOrders';
import {TWsAllOrdersActions} from '../actions/wsAllOrdersActions';
import {TOrder} from '../types/data';
import {sortByDate} from '../../utils';

type TWsAllOrdersState = {
  wsConnected: boolean,
  orders: TOrder[],
  total: number,
  totalToday: number,
};

const initialState: TWsAllOrdersState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
};

const wsAllOrdersReducer = (state = initialState, action: TWsAllOrdersActions): TWsAllOrdersState => {
  switch (action.type) {
    case WS_ALL_ORDERS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };
    case WS_ALL_ORDERS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      };
    case WS_ALL_ORDERS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };
    case WS_GET_ALL_ORDERS:
      return {
        ...state,
        orders: action.payload.orders?.sort(sortByDate),
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    default:
      return state;
  }
};

export default wsAllOrdersReducer;
