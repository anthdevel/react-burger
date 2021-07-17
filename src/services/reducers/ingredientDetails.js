import {CLEAR_INGREDIENT_DETAILS, GET_INGREDIENT_DETAILS} from '../actions/ingredientDetails';

const initialState = null;

export const ingredientDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENT_DETAILS: {
      return action.payload;
    }
    case CLEAR_INGREDIENT_DETAILS: {
      return null;
    }
    default:
      return state;
  }
}