import styles from './burger-ingredients.module.css';
import {useState} from 'react';
import PropTypes from 'prop-types';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import IngredientCard from '../ingredient-card/ingredient-card';
import IngredientDetails from '../ingredient-details/ingredient-details';

const BurgerIngredients = ({ingredients}) => {
  const [tab, setTab] = useState('bun');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ingredientDetails, setIngredientDetails] = useState(null);

  const buns = ingredients.filter(item => item.type === 'bun');
  const sauces = ingredients.filter(item => item.type === 'sauce');
  const main = ingredients.filter(item => item.type === 'main');

  const onClickCard = (id) => {
    const {
      calories,
      carbohydrates,
      fat,
      image_large: image,
      name,
      proteins,
    } = ingredients.filter(item => item._id === id)[0];

    setIngredientDetails({
      calories,
      carbohydrates,
      fat,
      image,
      name,
      proteins,
    })

    setIsModalOpen(true);
  }

  const onCloseModal = () => {
    setIsModalOpen(false);
    setIngredientDetails(null);
  }

  return (
    <>
      <div className={styles.root}>
        <div className={`${styles.tabs} mb-10`}>
          <Tab value='bun' active={tab === 'bun'} onClick={setTab}>
            Булки
          </Tab>
          <Tab value='sauce' active={tab === 'sauce'} onClick={setTab}>
            Соусы
          </Tab>
          <Tab value='main' active={tab === 'main'} onClick={setTab}>
            Начинки
          </Tab>
        </div>
        <div className={styles.content}>
          <section className='pb-10'>
            <h2 className='text text_type_main-medium mb-6'>Булки</h2>
            <div className={`${styles.cards} pl-4 pr-4`}>
              {buns.map(({_id, name, image, price}) => (
                <IngredientCard
                  key={_id}
                  image={image}
                  name={name}
                  price={price}
                  count={1}
                  onClickCard={() => onClickCard(_id)}
                />
              ))}
            </div>
          </section>
          <section className='pb-10'>
            <h2 className='text text_type_main-medium mb-6'>Соусы</h2>
            <div className={`${styles.cards} pl-4 pr-4`}>
              {sauces.map(({_id, name, image, price}) => (
                <IngredientCard
                  key={_id}
                  image={image}
                  name={name}
                  price={price}
                  count={1}
                  onClickCard={() => onClickCard(_id)}
                />
              ))}
            </div>
          </section>
          <section className='pb-10'>
            <h2 className='text text_type_main-medium mb-6'>Начинка</h2>
            <div className={`${styles.cards} pl-4 pr-4`}>
              {main.map(({_id, name, image, price}) => (
                <IngredientCard
                  key={_id}
                  image={image}
                  name={name}
                  price={price}
                  count={1}
                  onClickCard={() => onClickCard(_id)}
                />
              ))}
            </div>
          </section>
        </div>
      </div>

      {isModalOpen && (
        <Modal onClose={onCloseModal}>
          <IngredientDetails {...ingredientDetails}/>
        </Modal>
      )}
    </>
  )
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      proteins: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      carbohydrates: PropTypes.number.isRequired,
      calories: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string,
      image_mobile: PropTypes.string,
      image_large: PropTypes.string,
      __v: PropTypes.number,
    }).isRequired
  ).isRequired
};

export default BurgerIngredients;