import {combineReducers} from 'redux';
import {ingredientsReducer} from './ingredients';
import {ingredientDetailsReducer} from './ingredientDetails';
import {designReducer} from './design';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  design: designReducer,
});