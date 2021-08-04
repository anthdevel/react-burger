import {Button, ConstructorElement, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css';
import {useEffect, useState} from 'react';
import Modal from '../modal';
import OrderDetails from '../order-details';
import {useDispatch, useSelector} from 'react-redux';
import {useDrop} from 'react-dnd';
import {REMOVE_DESIGN_ITEM, SET_DESIGN_ITEM} from '../../services/actions/design';
import {getOrderNumber} from '../../services/actions/order';
import BurgerConstructorItem from '../burger-constructor-item';

const BurgerConstructor = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const {bun, main} = useSelector(store => store.design);
  const {number: orderNumber, isFetched} = useSelector(store => store.order)

  const [, dropTargetRef] = useDrop({
    accept: ['ingredient'],
    drop(item) {
      dispatch({type: SET_DESIGN_ITEM, payload: item});
    },
  });

  const getTotalPrice = () => {
    const bunTotalPrice = bun?.price * 2;

    let mainTotalPrice = 0;

    main.forEach(item => {
      mainTotalPrice += item.price;
    });

    return bunTotalPrice + mainTotalPrice;
  };

  const checkOut = () => {
    if (bun) {
      dispatch(getOrderNumber([bun._id, ...main.map(item => item._id), bun._id]));
    }
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  const onRemoveItem = (id) => {
    dispatch({type: REMOVE_DESIGN_ITEM, payload: id});
  };

  useEffect(() => {
    if (isFetched) {
      setIsModalOpen(true);
    }
  }, [isFetched]);

  return (
    <>
      <div className={`${styles.root} pl-4`}>
        <div className={styles.constructor} ref={dropTargetRef}>
          <div className={`${styles.constructorBase} mb-4`}>
            {bun && (
              <ConstructorElement
                type="top"
                isLocked
                text={`${bun.name} (верх)`}
                price={bun.price}
                thumbnail={bun.image_mobile}
              />
            )}
          </div>
          <div className={styles.constructorList}>
            {main.map(({uniqueId, name, price, image_mobile}, index) => (
              <BurgerConstructorItem
                key={uniqueId}
                uniqueId={uniqueId}
                index={index}
                name={name}
                price={price}
                image={image_mobile}
                onRemove={onRemoveItem}
              />
            ))}
          </div>
          <div className={`${styles.constructorBase} mt-4`}>
            {bun && (
              <ConstructorElement
                type="bottom"
                isLocked
                text={`${bun.name} (низ)`}
                price={bun.price}
                thumbnail={bun.image_mobile}
              />
            )}
          </div>
        </div>
        <div className={`${styles.summary} pt-10 pb-10 pr-4`}>
          <div className={`${styles.summaryPrice} mr-10`}>
            <span className="text text_type_digits-medium">{getTotalPrice() || 0}</span>
            <CurrencyIcon type="primary"/>
          </div>
          <Button type="primary" size="large" onClick={checkOut}>
            Оформить заказ
          </Button>
        </div>
      </div>

      {isModalOpen && (
        <Modal onClose={onCloseModal}>
          <OrderDetails orderNumber={orderNumber}/>
        </Modal>
      )}
    </>
  );
};

export default BurgerConstructor;