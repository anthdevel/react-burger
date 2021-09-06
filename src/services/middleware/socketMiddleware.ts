import {Middleware} from 'redux';
import {Nullable} from '../../types/types';

export const socketMiddleware = (wsUrl: string, wsActions: any): Middleware => {
  return store => {
    let socket: Nullable<WebSocket> = null;

    return next => action => {
      const {dispatch} = store;
      const {type} = action;

      const {
        wsInit,
        onOpen,
        onClose,
        onError,
        getFeedOrders,
      } = wsActions;

      if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}`);
      }

      if (socket) {
        socket.onopen = event => {
          dispatch({type: onOpen, payload: event});
        };

        socket.onerror = event => {
          dispatch({type: onError, payload: event});
        };

        socket.onmessage = event => {
          const {data} = event;
          const parsedData = JSON.parse(data);
          const {success, ...restParsedData} = parsedData;

          dispatch({
            type: getFeedOrders,
            payload: restParsedData
          });
        };

        socket.onclose = event => {
          dispatch({type: onClose, payload: event});
        };
      }

      next(action);
    };
  };
};