import {useParams} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import {getOrderDetailsFetch} from '../../services/actions/order';
import {useDispatch, useSelector} from '../../services/hooks';
import {getDate, getOrderStatus} from '../../utils';
import styles from './styles.module.css';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {EOrderStatus} from '../../types/enums';
import {TIngredient} from '../../services/types/data';

const OrderPage = () => {
  const [orderIngredients, setOrderIngredients] = useState<TIngredient[]>([])

  const {id} = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const {list: allIngredients, isFetched} = useSelector(store => store.ingredients);
  const {data: orderDetails} = useSelector(store => store.order.details);

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

  const uniqueIngredients = Array.from(new Set(orderIngredients));

  const getOrderQuantity = (array: string[] , id: string) => {
    return array.filter(item => item === id).length
  };

  useEffect(() => {
    if (orderDetails && allIngredients.length > 0) {
      setOrderIngredients(getOrderIngredients(orderDetails.ingredients, allIngredients));
    }
  }, [orderDetails, allIngredients]);

  useEffect(() => {
    dispatch(getOrderDetailsFetch(id));
  }, [dispatch, id]);

  return (
    <>
      {isFetched && uniqueIngredients.length > 0 && orderDetails && (
        <div className={`pt-30 ${styles.root}`}>
          <header className="mb-15">
            <p className={`${styles.orderNumber} text text_type_digits-medium mb-10`}>{`#${orderDetails.number}`}</p>
            <p className="text text_type_main-medium mb-3">{orderDetails.name}</p>
            <p
              className={`text text_type_main-default mt-2 ${orderDetails.status === EOrderStatus.Done && styles.orderSuccess}`}>{getOrderStatus(orderDetails.status)}</p>
          </header>
          <div className="mb-10">
            <p className="text text_type_main-medium mb-6">Состав:</p>
            <div className={styles.ingredientsList}>
              {uniqueIngredients.map((item) =>
                <div key={item._id} className={styles.ingredientsItem}>
                  <div className={styles.ingredientsIconContainer}>
                    <div className={styles.ingredientsIconWrapper}>
                      <img className={styles.ingredientsIcon} src={item.image_mobile} alt={item.name} />
                    </div>
                  </div>
                  <div className={styles.ingredientsTitle}>
                    <p className="text text_type_main-default">{item.name}</p>
                  </div>
                  <div className={styles.ingredientsSummary}>
                    <span className='text_type_digits-default mr-2'>{getOrderQuantity(orderDetails.ingredients, item._id)} x {item.price}</span>
                    <CurrencyIcon type="primary"/>
                  </div>
                </div>
              )}
            </div>
          </div>
          <footer className={styles.footer}>
            <p className="text text_type_main-default text_color_inactive">{getDate(orderDetails.createdAt)}</p>
            <div className={styles.sum}>
              <p
                className="text text_type_digits-default mr-2">{getOrderSum(orderDetails.ingredients, allIngredients)}</p>
              <CurrencyIcon type="primary"/>
            </div>
          </footer>
        </div>
      )}
    </>
  );
};

export default OrderPage;