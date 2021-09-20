import {Middleware} from 'redux';
import {Nullable} from '../../types/types';

type WsActions = {
  wsInit: string
  onOpen: string
  onClose: string
  onError: string
  onMessage: string
};

export const socketAllOrdersMiddleware = (wsUrl: string, wsAllOrdersActions: WsActions): Middleware => {
  return (store) => {
    let socket: Nullable<WebSocket> = null;

    return next => action => {
      const {dispatch} = store;
      const {type} = action;
      const {
        wsInit,
        onOpen,
        onClose,
        onError,
        onMessage,
      } = wsAllOrdersActions;

      if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}/all`);
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

          if (!success) {
            console.error(restParsedData.message);
          }

          dispatch({type: onMessage, payload: restParsedData});
        };

        socket.onclose = event => {
          dispatch({type: onClose, payload: event});
        };
      }

      next(action);
    };
  };
};
