import React, {useEffect, useState} from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.css';
import {URL_INGREDIENTS} from '../../utils';

function App() {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: []
  });

  const getData = () => {
    setState({...state, hasError: false, isLoading: true});

    fetch(URL_INGREDIENTS)
      .then(res => res.json())
      .then(({data}) => setState({...state, data, isLoading: false}))
      .catch(error => {
        setState({...state, hasError: true, isLoading: false});
        console.error(error);
      });
  };

  useEffect(() => {
    getData();
  }, [])

  const {data, isLoading, hasError} = state;

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
          {!isLoading && !hasError && data.length > 0 && (
            <>
              <BurgerIngredients data={data}/>
              <BurgerConstructor data={data}/>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
