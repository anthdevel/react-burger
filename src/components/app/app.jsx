import React, {useEffect, useState} from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.css';
import {URL_INGREDIENTS} from '../../utils';

function App() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(
    () => {
      fetch(URL_INGREDIENTS)
        .then(response => {
          if (response.ok) {
            return response.json();
          }

          return Promise.reject(`Ошибка ${response.status}`);
        })
        .then(({data}) => {
          setIngredients(data);
        })
        .catch(error => {
          console.error(error);
        })

    },
    []
  );

  return (
    <div className={styles.root}>
      <AppHeader/>
      <main className={styles.main}>
        <header className='pt-10 pb-5'>
          <h1 className='text text_type_main-large'>Соберите бургер</h1>
        </header>
        <div className={styles.content}>
          <BurgerIngredients/>
          {!!ingredients.length && (
            <BurgerConstructor ingredients={ingredients}/>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
