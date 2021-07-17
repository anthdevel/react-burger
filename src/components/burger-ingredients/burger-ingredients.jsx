import styles from './burger-ingredients.module.css';
import {useEffect, useState} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import IngredientCard from '../ingredient-card/ingredient-card';
import IngredientDetails from '../ingredient-details/ingredient-details';
import {useDispatch, useSelector} from 'react-redux';
import {getIngredients} from '../../services/actions/ingredients';
import {CLEAR_INGREDIENT_DETAILS, GET_INGREDIENT_DETAILS} from '../../services/actions/ingredientDetails';
import {Link, Element} from 'react-scroll';

const BurgerIngredients = () => {
  const dispatch = useDispatch();

  const [tab, setTab] = useState('bun');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {data: ingredients, isFetching, isFailed} = useSelector(store => store.ingredients);

  const buns = ingredients.filter(item => item.type === 'bun');
  const sauces = ingredients.filter(item => item.type === 'sauce');
  const main = ingredients.filter(item => item.type === 'main');

  const onClickCard = (id) => {
    const ingredient = ingredients.filter(item => item._id === id)[0];

    dispatch({
      type: GET_INGREDIENT_DETAILS,
      payload: ingredient
    })

    setIsModalOpen(true);
  }

  const onCloseModal = () => {
    setIsModalOpen(false);

    dispatch({type: CLEAR_INGREDIENT_DETAILS});
  }

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch])

  return (
    <>
      <div className={styles.root}>
        <div className={`${styles.tabs} mb-10`}>
          <Link smooth to='buns' duration={250} containerId='scrollableContainer'>
            <Tab value='bun' active={tab === 'bun'} onClick={setTab} to={tab} smooth>
              Булки
            </Tab>
          </Link>
          <Link smooth to='sauces' duration={250} containerId='scrollableContainer'>
            <Tab value='sauce' active={tab === 'sauce'} onClick={setTab}>
              Соусы
            </Tab>
          </Link>
          <Link smooth to='mains' duration={250} containerId='scrollableContainer'>
            <Tab value='main' active={tab === 'main'} onClick={setTab}>
              Начинки
            </Tab>
          </Link>
        </div>
        <Element className={styles.content} id='scrollableContainer'>
          {ingredients.length === 0 && isFetching && 'Загрузка...'}
          {isFailed && 'Что-то пошло не так.'}

          {!!ingredients.length && (
            <>
              <Element name='buns'>
                <section className='pb-10'>
                  <h2 className='text text_type_main-medium mb-6'>Булки</h2>
                  {!!buns.length ? (
                    <div className={`${styles.cards} pl-4 pr-4`}>
                      {buns.map(({_id, name, image, price}) => (
                        <IngredientCard
                          key={_id}
                          image={image}
                          name={name}
                          price={price}
                          onClickCard={() => onClickCard(_id)}
                        />
                      ))}
                    </div>
                  ) : 'Отсутствуют'}
                </section>
              </Element>
              <Element name='sauces'>
                <section className='pb-10'>
                  <h2 className='text text_type_main-medium mb-6'>Соусы</h2>
                  {!!sauces.length ? (
                    <div className={`${styles.cards} pl-4 pr-4`}>
                      {sauces.map(({_id, name, image, price}) => (
                        <IngredientCard
                          key={_id}
                          image={image}
                          name={name}
                          price={price}
                          onClickCard={() => onClickCard(_id)}
                        />
                      ))}
                    </div>
                  ) : 'Отсутствуют'}
                </section>
              </Element>
              <Element name='mains'>
                <section className='pb-10'>
                  <h2 className='text text_type_main-medium mb-6'>Начинка</h2>
                  {!!main.length ? (
                    <div className={`${styles.cards} pl-4 pr-4`}>
                      {main.map(({_id, name, image, price}) => (
                        <IngredientCard
                          key={_id}
                          image={image}
                          name={name}
                          price={price}
                          onClickCard={() => onClickCard(_id)}
                        />
                      ))}
                    </div>
                  ) : 'Отсутствует'}
                </section>
              </Element>
            </>
          )}
        </Element>
      </div>

      {isModalOpen && (
        <Modal onClose={onCloseModal}>
          <IngredientDetails/>
        </Modal>
      )}
    </>
  )
}

export default BurgerIngredients;