import {applyMiddleware, createStore} from 'redux';
import {rootReducer} from './reducers';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {socketMiddleware} from './middleware/socketMiddleware';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_FEED_ORDERS,
} from './constants/ws';

const wsUrl = 'wss://norma.nomoreparties.space/orders/all';

const wsActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  getFeedOrders: WS_GET_FEED_ORDERS,
};

const wsFeedOrdersMiddleware = socketMiddleware(wsUrl, wsActions);

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, wsFeedOrdersMiddleware)));


