import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_ERROR,
  GET_INGREDIENT_DETAILS
} from '../actions/ingredients';

const initialState = {
  list: [],
  details: null,
  isFetching: false,
  isFetched: false,
  isFailed: false,
};

export const ingredientsReducer = (state = initialState, action) => {
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