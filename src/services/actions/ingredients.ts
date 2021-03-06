import {getIngredients} from '../api';
import {GET_INGREDIENTS_ERROR, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENT_DETAILS} from '../constants/ingredients';
import {TIngredient} from '../types/data';
import {AppDispatch, AppThunk} from '../types';

export interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS
  readonly payload: TIngredient[]
}

export interface IGetIngredientsErrorAction {
  readonly type: typeof GET_INGREDIENTS_ERROR
}

export interface IGetIngredientDetailsAction {
  readonly type: typeof GET_INGREDIENT_DETAILS
  readonly payload: TIngredient
}

export type TIngredientsActions =
  | IGetIngredientsRequestAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsErrorAction
  | IGetIngredientDetailsAction;

export const getIngredientsRequestAction = (): IGetIngredientsRequestAction => ({
  type: GET_INGREDIENTS_REQUEST
})

export const getIngredientsSuccessAction = (data: TIngredient[]): IGetIngredientsSuccessAction => ({
  type: GET_INGREDIENTS_SUCCESS,
  payload: data
})

export const getIngredientsErrorAction = (): IGetIngredientsErrorAction => ({
  type: GET_INGREDIENTS_ERROR
})

export const getIngredientDetailsAction = (ingredient: TIngredient): IGetIngredientDetailsAction => ({
  type: GET_INGREDIENT_DETAILS,
  payload: ingredient
})

export const getIngredientsFetch: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(getIngredientsRequestAction());

  getIngredients()
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(`Ошибка ${response.status}`);
    })
    .then(({data}) => {
      dispatch(getIngredientsSuccessAction(data));
    })
    .catch(error => {
      dispatch(getIngredientsErrorAction());

      console.error(error);
    });
};