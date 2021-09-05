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
  WS_GET_PROFILE_ORDERS,
  WS_PROFILE_CONNECTION_START
} from './constants/ws';

const wsUrl = 'wss://norma.nomoreparties.space/orders/all';
const wsProfileUrl = 'wss://norma.nomoreparties.space/orders';

const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsInitProfile: WS_PROFILE_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  getFeedOrders: WS_GET_FEED_ORDERS,
  getProfileOrders: WS_GET_PROFILE_ORDERS
};

const wsFeedOrdersMiddleware = socketMiddleware(wsUrl, wsActions);
const wsProfileOrdersMiddleware = socketMiddleware(wsProfileUrl, wsActions, true);

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, wsFeedOrdersMiddleware, wsProfileOrdersMiddleware)));


