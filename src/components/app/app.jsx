import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.css';
import useIngredientsFetch from "../../hooks/useIngredientsFetch";

function App() {
  const {ingredients, isLoading, hasError} = useIngredientsFetch();

  return (
    <div className={styles.root}>
      <AppHeader/>
      <main className={styles.main}>
        <header className='pt-10 pb-5'>
          <h1 className='text text_type_main-large'>Соберите бургер</h1>
        </header>
        <div className={styles.content}>
          {isLoading && 'Загрузка...'}
          {hasError && 'Произошла ошибка при выполнении запроса'}
          {!isLoading && !hasError && ingredients.length > 0 && (
            <>
              <BurgerIngredients ingredients={ingredients}/>
              <BurgerConstructor ingredients={ingredients}/>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
