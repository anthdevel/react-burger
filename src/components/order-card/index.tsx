import React from 'react';
import styles from './styles.module.css';
import {getDate, getOrderStatus} from '../../utils';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {useSelector} from '../../services/hooks';
import {TIngredient, TOrder} from '../../services/types/data';
import {v4 as uuidv4} from 'uuid';

interface IOrderCardProps {
  readonly order: TOrder
  readonly isProfile?: boolean
}

const OrderCard = ({order, isProfile = false}: IOrderCardProps) => {
  const {ingredients: orderIngredientsIds} = order;

  const {list: allIngredients} = useSelector(store => store.ingredients);

  const getOrderSum = (arrayIds: string[], array: TIngredient[]) => {
    let sum = 0;

    arrayIds.forEach(id => {
      const ingredient = array.find(({_id}) => _id === id);

      sum = sum + ingredient!.price;
    });

    return sum;
  };

  const getOrderIngredients = (arrayIds: string[], array: TIngredient[]) => {
    const orderIngredients: TIngredient[] = [];

    arrayIds.forEach(id => {
      const ingredient = array.find(({_id}) => _id === id);
      orderIngredients.push(ingredient!);
    });

    return orderIngredients;
  };

  const orderIngredients = getOrderIngredients(orderIngredientsIds, allIngredients);

  return (
    <div className={styles.root}>
      <div className={`${styles.header} mb-6`}>
        <p className="text text_type_digits-default">#{order.number}</p>
        <p className="text text_type_main-default text_color_inactive">{getDate(order.createdAt)}</p>
      </div>
      <p className="text text_type_main-medium">{order.name}</p>
      {isProfile && (
        <p className="text text_type_main-default mt-2">{getOrderStatus(order.status)}</p>
      )}

      <div className={`${styles.footer} mt-6`}>
        <ul className={styles.icons}>
          {orderIngredients.map((item: TIngredient, index: number, array) =>
            (index < 5) ? (
              <li key={uuidv4()} className={styles.iconsItem} style={{zIndex: array.length - index}}>
                <img className={styles.iconsPic} src={item.image_mobile} alt=""/>
              </li>
            ) : (
              <li key={uuidv4()} className={`${styles.iconsItem} ${styles.iconsMuted}`}>
                <img className={styles.iconsPic} src={item.image_mobile} alt=""/>
                <span className={`${styles.restAmount} text text_type_main-default`}>+{array.length - 5}</span>
              </li>
            )
          )}
        </ul>
        <div className={styles.sum}>
          <p className="text text_type_digits-default mr-2">{getOrderSum(orderIngredientsIds, allIngredients)}</p>
          <CurrencyIcon type="primary"/>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;