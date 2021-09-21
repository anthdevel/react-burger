import {Middleware} from 'redux';
import {getCookie} from '../../utils';
import {ETokenVariant} from '../../types/enums';

type WsActions = {
	wsInit: string
	onOpen: string
	onClose: string
	onError: string
	onMessage: string
};

export const socketUserOrdersMiddleware = (wsUrl: string, wsUserOrdersActions: WsActions,): Middleware => {
  return store => {
    let socket: WebSocket | null = null;

    return next => action => {
      const {dispatch} = store;
      const {type} = action;
      const {
				wsInit,
				onOpen,
				onClose,
				onError,
				onMessage,
      } = wsUserOrdersActions;

      const token = getCookie(ETokenVariant.AccessToken);

      if (type === wsInit && token) {
        socket = new WebSocket(`${wsUrl}?token=${token}`);
      }

      if (socket) {
        socket.onopen = event => {
          dispatch({type: onOpen, payload: event});
        };

        socket.onerror = event => {
          dispatch({type: onError, payload: event});
        };

        socket.onclose = event => {
          dispatch({type: onClose, payload: event});
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
      }

      next(action);
    };
  };
};
