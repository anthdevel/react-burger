import {getIngredients} from '../api';
import {GET_INGREDIENTS_ERROR, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS} from '../constants/ingredients';

export const getIngredientsFetch = () => (dispatch: any) => {
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