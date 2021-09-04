import {store} from '../store';
import {TConstructorActions} from '../actions/constructor';
import {TIngredientsActions} from '../actions/ingredients';
import {TOrderActions} from '../actions/order';
import {TUserActions} from '../actions/user';
import {Action, ActionCreator} from 'redux';
import {ThunkAction} from 'redux-thunk';

export type RootState = ReturnType<typeof store.getState>;

type TApplicationActions =
  | TConstructorActions
  | TIngredientsActions
  | TOrderActions
  | TUserActions;

export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TApplicationActions>>;

export type AppDispatch = typeof store.dispatch;