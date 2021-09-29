import styles from './styles.module.css';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import BurgerIngredients from '../../components/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor';
import React, {FC} from 'react';
import {useSelector} from '../../services/hooks';

const MainPage: FC = () => {
  const {list: ingredients, isFetching, isFailed} = useSelector(store => store.ingredients);

  return (
    <>
      <header className='pt-10 pb-5'>
        <h1 className='text text_type_main-large'>Соберите бургер</h1>
      </header>
      <div className={styles.content}>
        {ingredients.length === 0 && isFetching && 'Загрузка конструктора...'}
        {isFailed && 'Что-то пошло не так.'}

        {!!ingredients.length && (
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients/>
            <BurgerConstructor/>
          </DndProvider>
        )}
      </div>
    </>
  )
}

export default MainPage;