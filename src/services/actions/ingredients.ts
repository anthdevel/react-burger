import {getIngredients} from '../api';
import {GET_INGREDIENTS_ERROR, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS} from '../constants/ingredients';
import {TIngredient} from '../types/data';

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

export type TIngredientsActions =
  | IGetIngredientsRequestAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsErrorAction;

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

export const getIngredientsFetch = () => (dispatch: any) => {
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