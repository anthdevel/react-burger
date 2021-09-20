import {applyMiddleware, createStore} from 'redux';
import {rootReducer} from './reducers';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {socketAllOrdersMiddleware} from './middleware/socketAllOrdersMiddleware';
import {
  WS_ALL_ORDERS_CONNECTION_CLOSED,
  WS_ALL_ORDERS_CONNECTION_ERROR,
  WS_ALL_ORDERS_CONNECTION_START,
  WS_ALL_ORDERS_CONNECTION_SUCCESS, WS_GET_ALL_ORDERS
} from './constants/wsAllOrders';

const wsUrl = 'wss://norma.nomoreparties.space/orders';

const wsAllOrdersActions = {
  wsInit: WS_ALL_ORDERS_CONNECTION_START,
  onOpen: WS_ALL_ORDERS_CONNECTION_SUCCESS,
  onClose: WS_ALL_ORDERS_CONNECTION_CLOSED,
  onError: WS_ALL_ORDERS_CONNECTION_ERROR,
  onMessage: WS_GET_ALL_ORDERS,
};

export const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(
    thunk,
    socketAllOrdersMiddleware(wsUrl, wsAllOrdersActions)
  )
));