import {combineReducers} from 'redux';
import {ingredientsReducer} from './ingredients';
import {designReducer} from './design';
import {orderReducer} from './order';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  design: designReducer,
  order: orderReducer
});