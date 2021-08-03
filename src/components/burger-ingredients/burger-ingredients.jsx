import styles from './burger-ingredients.module.css';
import {useRef, useState} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import IngredientCard from '../ingredient-card/ingredient-card';
import IngredientDetails from '../ingredient-details/ingredient-details';
import {useDispatch, useSelector} from 'react-redux';
import {scroller} from 'react-scroll';
import {InView} from 'react-intersection-observer';
import {CLEAR_INGREDIENT_DETAILS, GET_INGREDIENT_DETAILS} from '../../services/actions/ingredients';

const BurgerIngredients = () => {
  const dispatch = useDispatch();

  const [tab, setTab] = useState('bun');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentViewsRatio = useRef({});

  const {list: ingredients} = useSelector(store => store.ingredients);

  const buns = ingredients.filter(item => item.type === 'bun');
  const sauces = ingredients.filter(item => item.type === 'sauce');
  const main = ingredients.filter(item => item.type === 'main');

  const onClickCard = id => {
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

  const onChange = elemName => {
    return (inView, entry) => {
      currentViewsRatio.current[elemName] = entry.intersectionRatio;

      const elemNames = Object.keys(currentViewsRatio.current);

      let [max, maxName] = [
        currentViewsRatio.current[elemNames[0]],
        elemNames[0]
      ];

      elemNames.forEach(name => {
        if (currentViewsRatio.current[name] > max) {
          max = currentViewsRatio.current[name];
          maxName = name;
        }
      });

      setTab(maxName);
    };
  };

  const onClickTab = value => {
    setTab(value);

    scroller.scrollTo(value, {
      duration: 250,
      smooth: 'easeInOut',
      containerId: 'scrollableContainer'
    })
  }

  return (
    <>
      <div className={styles.root}>
        <div className={`${styles.tabs} mb-10`}>
          <Tab value='bun' active={tab === 'bun'} onClick={onClickTab}>
            Булки
          </Tab>
          <Tab value='sauce' active={tab === 'sauce'} onClick={onClickTab}>
            Соусы
          </Tab>
          <Tab value='main' active={tab === 'main'} onClick={onClickTab}>
            Начинки
          </Tab>
        </div>
        <div className={styles.content} id='scrollableContainer'>
          <InView
            onChange={onChange('bun')}
            threshold={[0, 0.25, 0.5, 0.75, 1]}
            id='bun'
          >
            <section className='pb-10'>
              <h2 className='text text_type_main-medium mb-6'>Булки</h2>
              <div className={`${styles.cards} pl-4 pr-4`}>
                {buns.map(({_id, ...rest}) => (
                  <IngredientCard
                    key={_id}
                    _id={_id}
                    onClickCard={() => onClickCard(_id)}
                    {...rest}
                  />
                ))}
              </div>
            </section>
          </InView>
          <InView
            onChange={onChange('sauce')}
            threshold={[0, 0.25, 0.5, 0.75, 1]}
            id='sauce'
          >
            <section className='pb-10'>
              <h2 className='text text_type_main-medium mb-6'>Соусы</h2>
              <div className={`${styles.cards} pl-4 pr-4`}>
                {sauces.map(({_id, ...rest}) => (
                  <IngredientCard
                    key={_id}
                    _id={_id}
                    onClickCard={() => onClickCard(_id)}
                    {...rest}
                  />
                ))}
              </div>
            </section>
          </InView>
          <InView
            onChange={onChange('main')}
            threshold={[0, 0.25, 0.5, 0.75, 1]}
            id='main'
          >
            <section className='pb-10'>
              <h2 className='text text_type_main-medium mb-6'>Начинки</h2>
              <div className={`${styles.cards} pl-4 pr-4`}>
                {main.map(({_id, ...rest}) => (
                  <IngredientCard
                    key={_id}
                    _id={_id}
                    onClickCard={() => onClickCard(_id)}
                    {...rest}
                  />
                ))}
              </div>
            </section>
          </InView>
        </div>
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