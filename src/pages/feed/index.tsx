import React from 'react';
import styles from './styles.module.css';
import {useHistory, useLocation} from 'react-router-dom';
import OrderCard from '../../components/order-card';
import OrdersSummary from '../../components/orders-summary';
import {useSelector} from '../../services/hooks';

const FeedPage = () => {
  const location = useLocation();
  const history = useHistory();

  const {orders} = useSelector(store => store.wsAllOrders);

  const onClickOrder = (id: number) => {
    history.push({
      pathname: `/feed/${id}`,
      state: {background: location}
    });
  };

  return (
    <>
      <header className="pt-10 pb-5">
        <h1 className="text text_type_main-large">Лента заказов</h1>
      </header>
      <div className={styles.content}>
        <div className={styles.ordersListWrapper}>
          <ul className={styles.ordersList}>
            {orders.map(item => (
                <li
                  key={item._id}
                  className={styles.ordersItem}
                  onClick={() => onClickOrder(item.number)}
                >
                  <OrderCard order={item}/>
                </li>
              )
            )}
          </ul>
        </div>
        <div>
          <OrdersSummary/>
        </div>
      </div>
    </>
  );
};

export default FeedPage;