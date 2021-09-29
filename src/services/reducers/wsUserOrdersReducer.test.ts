import * as types from '../constants/wsUserOrders';
import {TWsOrders} from '../types/data';
import {EOrderStatus} from '../../types/enums';
import {TWsUserOrdersActions} from '../actions/wsUserOrdersActions';
import wsUserOrdersReducer from './wsUserOrdersReducer';

describe('wsUserOrders reducer', () => {
  it('Должен вернуть начальное состояние', () => {
    expect(wsUserOrdersReducer(undefined, {} as TWsUserOrdersActions)).toEqual({
      wsConnected: false,
      orders: [],
    });
  });

  it('Должен вернуть состояние при успешном подключении сокета', () => {
    expect(wsUserOrdersReducer({
      wsConnected: false,
      orders: [],
    }, {
      type: types.WS_USER_ORDERS_CONNECTION_SUCCESS,
    })).toEqual({
      wsConnected: true,
      orders: [],
    });
  });

  it('Должен вернуть состояние, если при подключении сокета произошла ошибка', () => {
    expect(wsUserOrdersReducer({
      wsConnected: true,
      orders: [],
    }, {
      type: types.WS_USER_ORDERS_CONNECTION_ERROR,
    })).toEqual({
      wsConnected: false,
      orders: [],
    });
  });

  it('Должен вернуть состояние, если произошло закрытие соединения с сокетом', () => {
    expect(wsUserOrdersReducer({
      wsConnected: true,
      orders: [],
    }, {
      type: types.WS_USER_ORDERS_CONNECTION_CLOSED,
    })).toEqual({
      wsConnected: false,
      orders: [],
    });
  });

  it('Должен вернуть состояние при получении данных', () => {
    const orders = getData();

    expect(wsUserOrdersReducer({
      wsConnected: true,
      orders: [],
    }, {
      type: types.WS_GET_USER_ORDERS,
      payload: orders,
    })).toEqual({
      wsConnected: true,
      orders: orders.orders,
    });
  });
});


export const getData = (): TWsOrders => ({
  orders: [
    {
      createdAt: '2021-09-26T09:05:20.368Z',
      ingredients: [
        '60d3b41abdacab0026a733c9',
        '60d3b41abdacab0026a733d2',
        '60d3b41abdacab0026a733d1',
        '60d3b41abdacab0026a733d0',
        '60d3b41abdacab0026a733c7'
      ],
      name: 'Бессмертный альфа-сахаридный минеральный фалленианский флюоресцентный бургер',
      number: 3928,
      status: EOrderStatus.Done,
      updatedAt: '2021-09-26T09:05:20.433Z',
      _id: '615037d0dab0f3001bb091b9',
    },
    {
      createdAt: '2021-09-26T08:58:50.908Z',
      ingredients: [
        '60d3b41abdacab0026a733c6',
        '60d3b41abdacab0026a733ca',
        '60d3b41abdacab0026a733d1',
        '60d3b41abdacab0026a733d2',
        '60d3b41abdacab0026a733d3',
        '60d3b41abdacab0026a733d4'
      ],
      name: 'Краторный метеоритный альфа-сахаридный астероидный экзо-плантаго фалленианский бургер',
      number: 3927,
      status: EOrderStatus.Done,
      updatedAt: '2021-09-26T08:58:51.053Z',
      _id: '6150364adab0f3001bb091b8',
    },
    {
      createdAt: '2021-09-26T08:58:41.358Z',
      ingredients: [
        '60d3b41abdacab0026a733c7',
        '60d3b41abdacab0026a733c9',
        '60d3b41abdacab0026a733cb',
        '60d3b41abdacab0026a733ce',
        '60d3b41abdacab0026a733cf',
      ],
      name: 'Бессмертный антарианский традиционный-галактический био-марсианский флюоресцентный бургер',
      number: 3926,
      status: EOrderStatus.Done,
      updatedAt: '2021-09-26T08:58:41.479Z',
      _id: '61503641dab0f3001bb091b7',
    }
  ],
  success: true,
  total: 3841,
  totalToday: 32,
});