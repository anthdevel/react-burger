import {getIngredients} from '../api';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR';

export const GET_INGREDIENT_DETAILS = 'GET_INGREDIENT_DETAILS';
export const CLEAR_INGREDIENT_DETAILS = 'CLEAR_INGREDIENT_DETAILS';

export const getIngredientsFetch = () => dispatch => {
  dispatch({type: GET_INGREDIENTS_REQUEST});

  getIngredients()
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(`Ошибка ${response.status}`);
    })
    .then(({data}) => {
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        payload: data
      });
    })
    .catch(error => {
      dispatch({
        type: GET_INGREDIENTS_ERROR,
      });

      console.error(error);
    });
};