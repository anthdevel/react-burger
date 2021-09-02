import {combineReducers} from 'redux';
import {ingredientsReducer} from './ingredients';
import {constructorReducer} from './constructor';
import {orderReducer} from './order';
import {userReducer} from './user';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorStore: constructorReducer,
  order: orderReducer,
  user: userReducer
});