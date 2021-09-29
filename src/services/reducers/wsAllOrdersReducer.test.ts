import * as types from '../constants/wsAllOrders';
import {TWsOrders} from '../types/data';
import {EOrderStatus} from '../../types/enums';
import wsAllOrdersReducer from './wsAllOrdersReducer';
import {TWsAllOrdersActions} from '../actions/wsAllOrdersActions';

describe('wsAllOrders reducer', () => {
  it('Должен вернуть начальное состояние', () => {
    expect(wsAllOrdersReducer(undefined, {} as TWsAllOrdersActions)).toEqual({
      wsConnected: false,
      orders: [],
      total: 0,
      totalToday: 0,
    });
  });

  it('Должен вернуть состояние при успешном подключении сокета', () => {
    expect(wsAllOrdersReducer({
      wsConnected: false,
      orders: [],
      total: 0,
      totalToday: 0,
    }, {
      type: types.WS_ALL_ORDERS_CONNECTION_SUCCESS,
    })).toEqual({
      wsConnected: true,
      orders: [],
      total: 0,
      totalToday: 0,
    });
  });

  it('Должен вернуть состояние, если при подключении сокета произошла ошибка', () => {
    expect(wsAllOrdersReducer({
      wsConnected: true,
      orders: [],
      total: 0,
      totalToday: 0,
    }, {
      type: types.WS_ALL_ORDERS_CONNECTION_ERROR,
    })).toEqual({
      wsConnected: false,
      orders: [],
      total: 0,
      totalToday: 0,
    });
  });

  it('Должен вернуть состояние, если произошло закрытие соединения с сокетом', () => {
    expect(wsAllOrdersReducer({
      wsConnected: true,
      orders: [],
      total: 0,
      totalToday: 0,
    }, {
      type: types.WS_ALL_ORDERS_CONNECTION_CLOSED,
    })).toEqual({
      wsConnected: false,
      orders: [],
      total: 0,
      totalToday: 0,
    });
  });

  it('Должен вернуть состояние при получении данных', () => {
    const orders = getData();

    expect(wsAllOrdersReducer({
      wsConnected: true,
      orders: [],
      total: 0,
      totalToday: 0,
    }, {
      type: types.WS_GET_ALL_ORDERS,
      payload: orders,
    })).toEqual({
      wsConnected: true,
      orders: orders.orders,
      total: orders.total,
      totalToday: orders.totalToday,
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