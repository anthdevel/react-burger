import {combineReducers} from 'redux';
import {ingredientsReducer} from './ingredients';
import {designReducer} from './design';
import {orderReducer} from './order';
import {userReducer} from './user';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  design: designReducer,
  order: orderReducer,
  user: userReducer
});