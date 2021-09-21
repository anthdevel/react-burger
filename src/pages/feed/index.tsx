import React from 'react';
import styles from './styles.module.css';
import OrdersSummary from '../../components/orders-summary';
import OrdersList from '../../components/orders-list';

const FeedPage = () => {
  return (
    <>
      <header className="pt-10 pb-5">
        <h1 className="text text_type_main-large">Лента заказов</h1>
      </header>
      <div className={styles.content}>
        <div className={styles.ordersListContainer}>
          <div className={styles.ordersListWrapper}>
            <OrdersList />
          </div>
        </div>
        <div>
          <OrdersSummary/>
        </div>
      </div>
    </>
  );
};

export default FeedPage;