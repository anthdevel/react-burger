import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import IngredientDetails from '../../components/ingredient-details';
import {GET_INGREDIENT_DETAILS, getIngredientsFetch} from '../../services/actions/ingredients';
import styles from './styles.module.css';

const IngredientPage = () => {
  const dispatch = useDispatch();
  const {id} = useParams();
  const {list: ingredients, details: ingredientDetails} = useSelector(store => store.ingredients);

  useEffect(() => {
    dispatch(getIngredientsFetch());
  }, [dispatch]);

  useEffect(() => {
    const ingredient = ingredients.filter(item => item._id === id)[0];

    if (ingredient) {
      dispatch({
        type: GET_INGREDIENT_DETAILS,
        payload: ingredient
      });
    }
  }, [dispatch, ingredients, id]);

  return (
    <div className='pt-30'>
      <div className={styles.content}>
        {ingredientDetails ? (
          <>
            <h2 className={`${styles.title} text text_type_main-large`}>Детали ингредиента</h2>
            <IngredientDetails/>
          </>
        ) : (
          <h2 className={`${styles.title} text text_type_main-large`}>Ингредиент не найден</h2>
        )}
      </div>
    </div>
  );
};

export default IngredientPage;