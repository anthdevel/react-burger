import {getCookie} from '../../utils';
import {ETokenVariant} from '../../types/enums';
import {Middleware} from 'redux';
import {Nullable} from '../../types/types';

export const socketMiddleware = (wsUrl: string, wsActions: any, hasToken = false): Middleware => {
  return store => {
    let socket: Nullable<WebSocket> = null;

    return next => action => {
      const {dispatch} = store;
      const {type} = action;

      const {
        wsInit,
        wsInitProfile,
        onOpen,
        onClose,
        onError,
        getFeedOrders,
        getProfileOrders,
      } = wsActions;

      const accessToken = getCookie(ETokenVariant.AccessToken);

      if (type === wsInit && !hasToken) {
        socket = new WebSocket(`${wsUrl}`);
      }

      if (type === wsInitProfile && accessToken && hasToken) {
        socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
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

          if (hasToken) {
            dispatch({
              type: getProfileOrders,
              payload: restParsedData
            });
          } else {
            dispatch({
              type: getFeedOrders,
              payload: restParsedData
            });
          }
        };

        socket.onclose = event => {
          dispatch({type: onClose, payload: event});
        };
      }
      next(action);
    };
  };
};