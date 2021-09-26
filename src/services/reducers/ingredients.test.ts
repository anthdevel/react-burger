import {ingredientsReducer} from './ingredients';
import {TIngredientsActions} from '../actions/ingredients';
import * as types from '../constants/ingredients';
import {TIngredient} from '../types/data';
import {fetchableDefault, fetchableFailed, fetchableFetched, fetchableFetching} from '../../utils';

describe('ingredients reducer', () => {
  it('Должен вернуть начальное состояние', () => {
    expect(ingredientsReducer(undefined, {} as TIngredientsActions)).toEqual({
      list: [],
      details: null,
      ...fetchableDefault
    });
  });

  it('Должен вернуть состояние при начальном запросе ингредиентов', () => {
    expect(ingredientsReducer({
      list: [],
      details: null,
      ...fetchableDefault
    }, {
      type: types.GET_INGREDIENTS_REQUEST,
    })).toEqual({
      list: [],
      details: null,
      ...fetchableFetching
    });
  });

  it('Должен вернуть состояние при успешном запросе ингредиентов', () => {
    const ingredients = getData();

    expect(ingredientsReducer({
        list: [],
        details: null,
        ...fetchableFetching
      }, {
        type: types.GET_INGREDIENTS_SUCCESS,
        payload: ingredients
      }
    )).toEqual({
      list: ingredients,
      details: null,
      ...fetchableFetched
    });
  });

  it('Должен вернуть состояние, если при запросе ингредиентов произошла ошибка', () => {
    expect(ingredientsReducer({
        list: [],
        details: null,
        ...fetchableFetching
      },
      {
        type: types.GET_INGREDIENTS_ERROR
      })).toEqual({
      list: [],
      details: null,
      ...fetchableFailed
    });
  });

  it('Должен вернуть состояние с детальной информацией об ингредиенте', () => {
    const ingredients = getData();

    expect(ingredientsReducer({
        list: ingredients,
        details: null,
        ...fetchableFetched
      },
      {
        type: types.GET_INGREDIENT_DETAILS,
        payload: ingredients[0]
      })).toEqual({
      list: ingredients,
      details: ingredients[0],
      ...fetchableFetched
    });
  });
});

export const getData = (): TIngredient[] => ([
  {
    calories: 420,
    carbohydrates: 53,
    fat: 24,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    name: 'Краторная булка N-200i',
    price: 1255,
    proteins: 80,
    type: 'bun',
    __v: 0,
    _id: '60d3b41abdacab0026a733c6',
  },
  {
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
  {
    calories: 643,
    carbohydrates: 85,
    fat: 26,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    name: 'Филе Люминесцентного тетраодонтимформа',
    price: 988,
    proteins: 44,
    type: 'main',
    __v: 0,
    _id: '60d3b41abdacab0026a733c8',
  },
  {
    calories: 420,
    carbohydrates: 33,
    fat: 244,
    image: 'https://code.s3.yandex.net/react/code/meat-02.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
    name: 'Мясо бессмертных моллюсков Protostomia',
    price: 1337,
    proteins: 433,
    type: 'main',
    __v: 0,
    _id: '60d3b41abdacab0026a733c9',
  },
  {
    calories: 2674,
    carbohydrates: 300,
    fat: 800,
    image: 'https://code.s3.yandex.net/react/code/meat-04.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
    name: 'Говяжий метеорит (отбивная)',
    price: 3000,
    proteins: 800,
    type: 'main',
    __v: 0,
    _id: '60d3b41abdacab0026a733ca',
  },
  {
    calories: 4242,
    carbohydrates: 242,
    fat: 142,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    name: 'Биокотлета из марсианской Магнолии',
    price: 424,
    proteins: 420,
    type: 'main',
    __v: 0,
    _id: '60d3b41abdacab0026a733cb',
  },
  {
    calories: 30,
    carbohydrates: 40,
    fat: 20,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    name: 'Соус Spicy-X',
    price: 90,
    proteins: 30,
    type: 'sauce',
    __v: 0,
    _id: '60d3b41abdacab0026a733cc',
  },
  {
    calories: 14,
    carbohydrates: 11,
    fat: 22,
    image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
    name: 'Соус фирменный Space Sauce',
    price: 80,
    proteins: 50,
    type: 'sauce',
    __v: 0,
    _id: '60d3b41abdacab0026a733cd',
  },
  {
    calories: 99,
    carbohydrates: 42,
    fat: 24,
    image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
    name: 'Соус традиционный галактический',
    price: 15,
    proteins: 42,
    type: 'sauce',
    __v: 0,
    _id: '60d3b41abdacab0026a733ce',
  },
  {
    calories: 100,
    carbohydrates: 100,
    fat: 99,
    image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
    name: 'Соус с шипами Антарианского плоскоходца',
    price: 88,
    proteins: 101,
    type: 'sauce',
    __v: 0,
    _id: '60d3b41abdacab0026a733cf',
  },
  {
    calories: 986,
    carbohydrates: 609,
    fat: 689,
    image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
    image_large: 'https://code.s3.yandex.net/react/code/mineral_rings-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
    name: 'Хрустящие минеральные кольца',
    price: 300,
    proteins: 808,
    type: 'main',
    __v: 0,
    _id: '60d3b41abdacab0026a733d0',
  },
  {
    calories: 77,
    carbohydrates: 55,
    fat: 5,
    image: 'https://code.s3.yandex.net/react/code/sp_1.png',
    image_large: 'https://code.s3.yandex.net/react/code/sp_1-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sp_1-mobile.png',
    name: 'Плоды Фалленианского дерева',
    price: 874,
    proteins: 20,
    type: 'main',
    __v: 0,
    _id: '60d3b41abdacab0026a733d1',
  },
  {
    calories: 189,
    carbohydrates: 111,
    fat: 432,
    image: 'https://code.s3.yandex.net/react/code/core.png',
    image_large: 'https://code.s3.yandex.net/react/code/core-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/core-mobile.png',
    name: 'Кристаллы марсианских альфа-сахаридов',
    price: 762,
    proteins: 234,
    type: 'main',
    __v: 0,
    _id: '60d3b41abdacab0026a733d2',
  },
  {
    calories: 6,
    carbohydrates: 3,
    fat: 2,
    image: 'https://code.s3.yandex.net/react/code/salad.png',
    image_large: 'https://code.s3.yandex.net/react/code/salad-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/salad-mobile.png',
    name: 'Мини-салат Экзо-Плантаго',
    price: 4400,
    proteins: 1,
    type: 'main',
    __v: 0,
    _id: '60d3b41abdacab0026a733d3',
  },
  {
    calories: 3377,
    carbohydrates: 420,
    fat: 48,
    image: 'https://code.s3.yandex.net/react/code/cheese.png',
    image_large: 'https://code.s3.yandex.net/react/code/cheese-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/cheese-mobile.png',
    name: 'Сыр с астероидной плесенью',
    price: 4142,
    proteins: 84,
    type: 'main',
    __v: 0,
    _id: '60d3b41abdacab0026a733d4',
  }
]);