import * as types from '../constants/constructor';
import {constructorReducer} from './constructor';
import {TConstructorActions} from '../actions/constructor';

describe('constructor reducer', () => {
  it('Должен вернуть начальное состояние', () => {
    expect(constructorReducer(undefined, {} as TConstructorActions)).toEqual({
      bun: null,
      main: [],
    });
  });

  it('Должен вернуть состояние при добавлении булки в конструктор', () => {
    expect(constructorReducer({
        bun: null,
        main: [],
      },
      {
        type: types.SET_CONSTRUCTOR_ITEM,
        payload: {
          calories: 643,
          carbohydrates: 85,
          fat: 26,
          image: 'https://code.s3.yandex.net/react/code/bun-01.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          name: 'Флюоресцентная булка R2-D3',
          price: 988,
          proteins: 44,
          type: 'bun',
          __v: 0,
          _id: '60d3b41abdacab0026a733c7',
        }
      }
    ))
      .toEqual({
        bun: {
          calories: 643,
          carbohydrates: 85,
          fat: 26,
          image: 'https://code.s3.yandex.net/react/code/bun-01.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          name: 'Флюоресцентная булка R2-D3',
          price: 988,
          proteins: 44,
          type: 'bun',
          __v: 0,
          _id: '60d3b41abdacab0026a733c7',
        },
        main: [],
      });
  });

  it('Должен вернуть состояние при добавлении ингредиента в конструктор', () => {
    expect(constructorReducer({
        bun: null,
        main: [],
      },
      {
        type: types.SET_CONSTRUCTOR_ITEM,
        payload: {
          _id: '60d3b41abdacab0026a733cd',
          name: 'Соус фирменный Space Sauce',
          type: 'sauce',
          proteins: 50,
          fat: 22,
          carbohydrates: 11,
          calories: 14,
          price: 80,
          image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
          __v: 0,
        }
      }
    )).toEqual({
      bun: null,
      main: [{
        _id: '60d3b41abdacab0026a733cd',
        name: 'Соус фирменный Space Sauce',
        type: 'sauce',
        proteins: 50,
        fat: 22,
        carbohydrates: 11,
        calories: 14,
        price: 80,
        image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
        __v: 0,
        uniqueId: expect.any(String)
      }],
    });
  });

  it('Должен вернуть состояние, при удалении ингредиента', () => {
    expect(constructorReducer({
        bun: null,
        main: [{
          _id: '60d3b41abdacab0026a733cd',
          name: 'Соус фирменный Space Sauce',
          type: 'sauce',
          proteins: 50,
          fat: 22,
          carbohydrates: 11,
          calories: 14,
          price: 80,
          image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
          __v: 0,
          uniqueId: '6b755d19-1f1c-4494-831d-0e48168ccdb9'
        }],
      },
      {
        type: types.REMOVE_CONSTRUCTOR_ITEM,
        payload: '6b755d19-1f1c-4494-831d-0e48168ccdb9'
      }
    )).toEqual({
      bun: null,
      main: [],
    });
  });

  it('Должен вернуть состояние при очистке конструктора', () => {
    expect(constructorReducer({
        bun: {
          calories: 643,
          carbohydrates: 85,
          fat: 26,
          image: 'https://code.s3.yandex.net/react/code/bun-01.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          name: 'Флюоресцентная булка R2-D3',
          price: 988,
          proteins: 44,
          type: 'bun',
          __v: 0,
          _id: '60d3b41abdacab0026a733c7',
        },
        main: [{
          _id: '60d3b41abdacab0026a733cd',
          name: 'Соус фирменный Space Sauce',
          type: 'sauce',
          proteins: 50,
          fat: 22,
          carbohydrates: 11,
          calories: 14,
          price: 80,
          image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
          __v: 0,
          uniqueId: '6b755d19-1f1c-4494-831d-0e48168ccdb9'
        }],
      },
      {
        type: types.RESET_CONSTRUCTOR
      }
    )).toEqual({
      bun: null,
      main: [],
    });
  });

  it('Должен вернуть состояние при перемещении ингредиентов', () => {
    expect(constructorReducer({
        bun: null,
        main: [
          {
            _id: '60d3b41abdacab0026a733cd',
            name: 'Соус фирменный Space Sauce',
            type: 'sauce',
            proteins: 50,
            fat: 22,
            carbohydrates: 11,
            calories: 14,
            price: 80,
            image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
            __v: 0,
            uniqueId: '8f337c0d-bbdd-404c-b592-c97c13a4b621'
          },
          {
            _id: '60d3b41abdacab0026a733cf',
            name: 'Соус с шипами Антарианского плоскоходца',
            type: 'sauce',
            proteins: 101,
            fat: 99,
            carbohydrates: 100,
            calories: 100,
            price: 88,
            image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
            __v: 0,
            uniqueId: '2c4c8d57-25f4-47ea-bd1b-22d1c745216c'
          }
        ]
      },
      {
        type: types.REPLACE_CONSTRUCTOR_ITEMS,
        payload: {
          dragIndex: 1,
          hoverIndex: 0
        }
      }
    )).toEqual({
      bun: null,
      main: [
        {
          _id: '60d3b41abdacab0026a733cf',
          name: 'Соус с шипами Антарианского плоскоходца',
          type: 'sauce',
          proteins: 101,
          fat: 99,
          carbohydrates: 100,
          calories: 100,
          price: 88,
          image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
          __v: 0,
          uniqueId: '2c4c8d57-25f4-47ea-bd1b-22d1c745216c'
        },
        {
          _id: '60d3b41abdacab0026a733cd',
          name: 'Соус фирменный Space Sauce',
          type: 'sauce',
          proteins: 50,
          fat: 22,
          carbohydrates: 11,
          calories: 14,
          price: 80,
          image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
          __v: 0,
          uniqueId: '8f337c0d-bbdd-404c-b592-c97c13a4b621'
        },
      ]
    });
  });
});