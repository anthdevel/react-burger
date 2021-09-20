import {combineReducers} from 'redux';
import {ingredientsReducer} from './ingredients';
import {constructorReducer} from './constructor';
import {orderReducer} from './order';
import {userReducer} from './user';
import wsAllOrdersReducer from './wsAllOrdersReducer';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorStore: constructorReducer,
  order: orderReducer,
  user: userReducer,
  wsAllOrders: wsAllOrdersReducer,
});