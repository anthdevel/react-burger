import * as types from '../constants/order';
import {orderReducer} from './order';
import {fetchableDefault, fetchableFailed, fetchableFetched, fetchableFetching} from '../../utils';
import {TOrderActions} from '../actions/order';
import {TOrder} from '../types/data';
import {EOrderStatus} from '../../types/enums';

describe('order reducer', () => {
  it('Должен вернуть начальное состояние', () => {
    expect(orderReducer(undefined, {} as TOrderActions)).toEqual({
      number: {
        ...fetchableDefault,
        data: null,
      },
      details: {
        ...fetchableDefault,
        data: null,
      },
    });
  });

  it('Должен вернуть состояние при начальном запросе номера заказа', () => {
    expect(orderReducer({
        number: {
          ...fetchableDefault,
          data: null,
        },
        details: {
          ...fetchableDefault,
          data: null,
        },
      },
      {
        type: types.GET_ORDER_NUMBER_REQUEST
      })).toEqual({
      number: {
        ...fetchableFetching,
        data: null,
      },
      details: {
        ...fetchableDefault,
        data: null,
      },
    });
  });

  it('Должен вернуть состояние при успешном запросе номера заказа', () => {
    expect(orderReducer({
        number: {
          ...fetchableFetching,
          data: null,
        },
        details: {
          ...fetchableDefault,
          data: null,
        },
      },
      {
        type: types.GET_ORDER_NUMBER_SUCCESS,
        payload: 3930
      }
    )).toEqual({
      number: {
        ...fetchableFetched,
        data: 3930,
      },
      details: {
        ...fetchableDefault,
        data: null,
      },
    });
  });

  it('Должен вернуть состояние, если при запросе номера заказа произошла ошибка', () => {
    expect(orderReducer({
        number: {
          ...fetchableFetching,
          data: null,
        },
        details: {
          ...fetchableDefault,
          data: null,
        },
      },
      {
        type: types.GET_ORDER_NUMBER_ERROR
      }
    )).toEqual({
      number: {
        ...fetchableFailed,
        data: null,
      },
      details: {
        ...fetchableDefault,
        data: null,
      },
    });
  });

  it('Должен вернуть состояние при начальном запросе детализации заказа', () => {
    expect(orderReducer({
        number: {
          ...fetchableDefault,
          data: null,
        },
        details: {
          ...fetchableDefault,
          data: null,
        },
      },
      {
        type: types.GET_ORDER_DETAILS_REQUEST
      }
    )).toEqual({
      number: {
        ...fetchableDefault,
        data: null,
      },
      details: {
        ...fetchableFetching,
        data: null,
      },
    });
  });

  it('Должен вернуть состояние при успешном запросе детализации заказа', () => {
    const order = getData();

    expect(orderReducer({
      number: {
        ...fetchableDefault,
        data: null,
      },
      details: {
        ...fetchableFetching,
        data: null,
      },
    }, {
      type: types.GET_ORDER_DETAILS_SUCCESS,
      payload: order
    })).toEqual({
      number: {
        ...fetchableDefault,
        data: null,
      },
      details: {
        ...fetchableFetched,
        data: order,
      },
    });
  });

  it('Должен вернуть состояние, если при запросе детализации заказа произошла ошибка', () => {
    expect(orderReducer({
        number: {
          ...fetchableDefault,
          data: null,
        },
        details: {
          ...fetchableFetching,
          data: null,
        },
      },
      {
        type: types.GET_ORDER_DETAILS_ERROR
      }
    )).toEqual({
      number: {
        ...fetchableDefault,
        data: null,
      },
      details: {
        ...fetchableFailed,
        data: null,
      },
    });
  });

  it('Должен вернуть состояние при очистке детализации заказа', () => {
    const order = getData();

    expect(orderReducer({
        number: {
          ...fetchableDefault,
          data: null,
        },
        details: {
          ...fetchableFetched,
          data: order,
        },
      },
      {
        type: types.CLEAR_ORDER_DETAILS
      }
    )).toEqual({
      number: {
        ...fetchableDefault,
        data: null,
      },
      details: {
        ...fetchableFetched,
        data: null,
      },
    });
  });
});

export const getData = (): TOrder => ({
  createdAt: '2021-09-26T11:05:01.221Z',
  ingredients: [
    '60d3b41abdacab0026a733c7',
    '60d3b41abdacab0026a733cd',
    '60d3b41abdacab0026a733cf',
    '60d3b41abdacab0026a733c7'
  ],
  name: 'Антарианский space флюоресцентный бургер',
  number: 3930,
  owner: '610ebd979d952f001b82375e',
  status: EOrderStatus.Done,
  updatedAt: '2021-09-26T11:05:01.359Z',
  __v: 0,
  _id: '615053dddab0f3001bb091cf',
});