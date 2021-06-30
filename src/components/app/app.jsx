import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.css';
import {data} from '../../utils/data';

function App() {
  return (
    <div className={styles.root}>
      <AppHeader/>
      <main className={styles.main}>
        <header className='pt-10 pb-5'>
          <h1 className='text text_type_main-large'>Соберите бургер</h1>
        </header>
        <div className={styles.content}>
          <BurgerIngredients data={data}/>
          <BurgerConstructor data={data}/>
        </div>
      </main>
    </div>
  );
}

export default App;
