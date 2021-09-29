import {
  GET_INGREDIENT_DETAILS,
  GET_INGREDIENTS_ERROR,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS
} from '../constants/ingredients';
import {TIngredient} from '../types/data';
import {Nullable} from '../../types/types';
import {TIngredientsActions} from '../actions/ingredients';

export type TIngredientsState = {
  list: TIngredient[]
  details: Nullable<TIngredient>
  isFetching: boolean
  isFetched: boolean
  isFailed: boolean
}

const initialState: TIngredientsState = {
  list: [],
  details: null,
  isFetching: false,
  isFetched: false,
  isFailed: false,
};

export const ingredientsReducer = (state = initialState, action: TIngredientsActions): TIngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        isFetching: true,
        isFetched: false,
        isFailed: false,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        list: action.payload,
        isFetching: false,
        isFetched: true,
        isFailed: false,
      };
    }
    case GET_INGREDIENTS_ERROR: {
      return {
        ...state,
        isFetching: false,
        isFetched: false,
        isFailed: true,
      };
    }
    case GET_INGREDIENT_DETAILS: {
      return {
        ...state,
        details: action.payload
      };
    }
    default:
      return state;
  }
}