import React, {FC, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import IngredientDetails from '../../components/ingredient-details';
import {getIngredientDetailsAction} from '../../services/actions/ingredients';
import styles from './styles.module.css';
import {useDispatch, useSelector} from '../../services/hooks';

const IngredientPage: FC = () => {
  const dispatch = useDispatch();
  const {id} = useParams<{id: string}>();
  const {list: ingredients, details: ingredientDetails} = useSelector(store => store.ingredients);

  useEffect(() => {
    const ingredient = ingredients.filter(item => item._id === id)[0];

    if (ingredient) {
      dispatch(getIngredientDetailsAction(ingredient));
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