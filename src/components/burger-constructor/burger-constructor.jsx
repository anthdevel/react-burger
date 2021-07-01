import {Button, ConstructorElement, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';
import {useState} from 'react';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

const BurgerConstructor = ({ingredients}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const bun = ingredients.filter(item => item.type === 'bun')[0];
  const rest = ingredients.filter(item => item.type !== 'bun');

  const onOpenModal = () => {
    setIsModalOpen(true);
  }

  const onCloseModal = () => {
    setIsModalOpen(false);
  }

  return (
    <>
      <div className={`${styles.root} pl-4`}>
        <div className={styles.constructor}>
          <div className={`${styles.constructorBase} mb-4`}>
            <div className={styles.constructorItem}>
              <div className={styles.constructorItemMain}>
                <ConstructorElement
                  type='top'
                  isLocked
                  text={bun.name}
                  price={bun.price}
                  thumbnail={bun.image_mobile}
                />
              </div>
            </div>
          </div>
          <div className={styles.constructorList}>
            {rest.map(({_id, name, price, image_mobile}) => (
              <div className={styles.constructorItem} key={_id}>
                <div className={styles.constructorItemDrag}>
                  <DragIcon type='primary'/>
                </div>
                <div className={styles.constructorItemMain}>
                  <ConstructorElement
                    text={name}
                    price={price}
                    thumbnail={image_mobile}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className={`${styles.constructorBase} mt-4`}>
            <div className={styles.constructorItem}>
              <div className={styles.constructorItemMain}>
                <ConstructorElement
                  type='bottom'
                  isLocked
                  text={bun.name}
                  price={bun.price}
                  thumbnail={bun.image_mobile}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.summary} pt-10 pb-10 pr-4`}>
          <div className={`${styles.summaryPrice} mr-10`}>
            <span className='text text_type_digits-medium'>610</span>
            <CurrencyIcon type='primary'/>
          </div>
          <Button type='primary' size='large' onClick={onOpenModal}>
            Оформить заказ
          </Button>
        </div>
      </div>

      {isModalOpen && (
        <Modal onClose={onCloseModal}>
          <OrderDetails id='034536'/>
        </Modal>
      )}
    </>
  )
}

BurgerConstructor.propTypes = {
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

export default BurgerConstructor;