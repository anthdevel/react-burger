import {
  WS_USER_ORDERS_CONNECTION_SUCCESS,
  WS_USER_ORDERS_CONNECTION_ERROR,
  WS_USER_ORDERS_CONNECTION_CLOSED,
  WS_GET_USER_ORDERS,
} from '../constants/wsUserOrders';
import {TWsUserOrdersActions} from '../actions/wsUserOrdersActions';
import {TOrder} from '../types/data';
import {sortByDate} from '../../utils';

type TWsUserOrdersState = {
  wsConnected: boolean,
  orders: TOrder[],
};

const initialState: TWsUserOrdersState = {
  wsConnected: false,
  orders: [],
};

const wsUserOrdersReducer = (state = initialState, action: TWsUserOrdersActions): TWsUserOrdersState => {
  switch (action.type) {
    case WS_USER_ORDERS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };
    case WS_USER_ORDERS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      };
    case WS_USER_ORDERS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };
    case WS_GET_USER_ORDERS:
      return {
        ...state,
        orders: action.payload.orders?.sort(sortByDate),
      };
    default:
      return state;
  }
};

export default wsUserOrdersReducer;
