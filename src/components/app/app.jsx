import React, {useEffect} from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.css';
import {getIngredients} from '../../services/actions/ingredients';
import {useDispatch, useSelector} from 'react-redux';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

function App() {
  const dispatch = useDispatch();
  const {list: ingredients, isFetching, isFailed} = useSelector(store => store.ingredients);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch])

  return (
    <div className={styles.root}>
      <AppHeader/>
      <main className={styles.main}>
        <header className='pt-10 pb-5'>
          <h1 className='text text_type_main-large'>Соберите бургер</h1>
        </header>
        <div className={styles.content}>
          {ingredients.length === 0 && isFetching && 'Загрузка конструктора...'}
          {isFailed && 'Что-то пошло не так.'}

          {!!ingredients.length && (
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients ingredients={ingredients}/>
              <BurgerConstructor/>
            </DndProvider>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
