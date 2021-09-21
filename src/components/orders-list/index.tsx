import styles from './styles.module.css';
import OrderCard from '../order-card';
import React, {FC} from 'react';
import {useSelector} from '../../services/hooks';

interface IOrdersListProps {
  readonly mode?: 'feed' | 'profile';
}

const OrdersList: FC<IOrdersListProps> = ({mode = 'feed'}) => {
  const {orders: allOrders} = useSelector(store => store.wsAllOrders);
  const {orders: userOrders} = useSelector(store => store.wsUserOrders);

  return (
    <>
      {mode === 'feed' ? (
        <ul className={styles.ordersList}>
          {allOrders.length > 0 && allOrders.map(item => (
              <li key={item._id} className={styles.ordersItem}>
                <OrderCard order={item}/>
              </li>
            )
          )}
        </ul>
      ) : (
        <ul className={styles.ordersList}>
          {userOrders.length > 0 && userOrders.map(item => (
              <li key={item._id} className={styles.ordersItem}>
                <OrderCard hasStatus order={item}/>
              </li>
            )
          )}
        </ul>
      )}
    </>
  );
}

export default OrdersList;