import styles from './styles.module.css';
import OrderCard from '../order-card';
import React, {FC} from 'react';
import {useSelector} from '../../services/hooks';
import {useHistory} from 'react-router-dom';

interface IOrdersListProps {
  readonly mode?: 'feed' | 'profile';
}

const OrdersList: FC<IOrdersListProps> = ({mode = 'feed'}) => {
  const history = useHistory();

  const {orders: allOrders} = useSelector(store => store.wsAllOrders);
  const {orders: userOrders} = useSelector(store => store.wsUserOrders);

  const onOrderClick = (id: number) => {
    const path = mode === 'feed'
      ? `/feed/${id}`
      : `/profile/orders/${id}`;
    history.push(path);
  }

  return (
    <>
      {mode === 'feed' ? (
        <ul className={styles.ordersList}>
          {allOrders?.length > 0 && allOrders.map(item => (
              <li key={item._id} className={styles.ordersItem}>
                <OrderCard
                  order={item}
                  onOrderClick={onOrderClick}
                />
              </li>
            )
          )}
        </ul>
      ) : (
        <ul className={styles.ordersList}>
          {userOrders?.length > 0 && userOrders.map(item => (
              <li key={item._id} className={styles.ordersItem}>
                <OrderCard
                  order={item}
                  hasStatus
                  onOrderClick={onOrderClick}
                />
              </li>
            )
          )}
        </ul>
      )}
    </>
  );
}

export default OrdersList;