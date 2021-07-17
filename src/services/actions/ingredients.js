import {URL_INGREDIENTS} from '../../utils';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR';

export const getIngredients = () => dispatch => {
  dispatch({type: GET_INGREDIENTS_REQUEST});

  fetch(URL_INGREDIENTS)
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