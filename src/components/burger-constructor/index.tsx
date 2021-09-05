import {Button, ConstructorElement, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css';
import {FC, useEffect, useState} from 'react';
import Modal from '../modal';
import OrderDetails from '../order-details';
import {useDrop} from 'react-dnd';
import {getOrderNumberFetch} from '../../services/actions/order';
import BurgerConstructorItem from '../burger-constructor-item';
import {useHistory} from 'react-router-dom';
import {hasToken} from '../../utils';
import {removeConstructorItemAction, resetConstructorAction, setConstructorItemAction} from '../../services/actions/constructor';
import {TIngredient} from '../../services/types/data';
import {useDispatch, useSelector} from '../../services/hooks';

const BurgerConstructor: FC = () => {
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  const {bun, main} = useSelector(store => store.constructorStore);

  const {data: orderNumber, isFetched: isOrderFetched} = useSelector(store => store.order.number);

  const [, dropTargetRef] = useDrop({
    accept: ['ingredient'],
    drop(item: TIngredient) {
      dispatch(setConstructorItemAction(item));
    },
  });

  const getTotalPrice = () => {
    const bunTotalPrice = (bun?.price ?? 0) * 2;

    let mainTotalPrice = 0;

    main.forEach(item => {
      mainTotalPrice += item.price;
    });

    return bunTotalPrice + mainTotalPrice;
  };

  const checkOut = () => {
    if (hasToken() && bun) {
      dispatch(getOrderNumberFetch([bun._id, ...main.map(item => item._id), bun._id]));
    } else {
      history.push("/login");
    }
  };

  const onCloseModal = () => {
    dispatch(resetConstructorAction());
    setIsModalOpen(false);
  };

  const onRemoveItem = (id: string) => {
    dispatch(removeConstructorItemAction(id));
  };

  useEffect(() => {
    if (isOrderFetched) {
      setIsModalOpen(true);
    }
  }, [isOrderFetched]);

  return (
    <>
      <div className={`${styles.root} pl-4`}>
        <div className={styles.constructorRow} ref={dropTargetRef}>
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
            {main.map(({uniqueId, name, price, image_mobile}, index: number) => (
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
          <Button size="large" onClick={checkOut}>
            Оформить заказ
          </Button>
        </div>
      </div>

      {isModalOpen && orderNumber && (
        <Modal onClose={onCloseModal}>
          <OrderDetails orderNumber={orderNumber}/>
        </Modal>
      )}
    </>
  );
};

export default BurgerConstructor;