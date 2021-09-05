import React, {FC} from 'react';
import styles from './styles.module.css';
import {useSelector} from '../../services/hooks';
import {EOrderStatus} from '../../types/enums';

const OrdersSummary: FC = () => {
  const {feedOrders, total, totalToday} = useSelector(store => store.ws);

  const pendingOrders = feedOrders.filter(({status}) => status === EOrderStatus.Pending);
  const doneOrders = feedOrders.filter(({status}) => status === EOrderStatus.Done);

  return (
    <>
      <div className={styles.orders}>
        <div>
          <p className="text text_type_main-medium mb-6">
            Готовы:
          </p>
          <div className={`${styles.ordersRow} ${styles.ordersSuccess}`}>
            <ul className={styles.ordersList}>
              {doneOrders.slice(0, 10).map(({_id, number}) => (
                  <li className="text text_type_digits-default mb-2" key={_id}>{number}</li>
                )
              )}
            </ul>
            <ul className={styles.ordersList}>
              {doneOrders.length > 10 && doneOrders?.slice(10, 20).map(({_id, number}) => (
                  <li className="text text_type_digits-default mb-2" key={_id}>{number}</li>
                )
              )}
            </ul>
          </div>
        </div>
        <div>
          <p className="text text_type_main-medium mb-6">
            В работе:
          </p>
          <div className={styles.ordersRow}>
            <ul className={styles.ordersList}>
              {pendingOrders.slice(0, 10).map(({_id, number}) => (
                  <li className="text text_type_digits-default mb-2" key={_id}>{number}</li>
                )
              )}
            </ul>
            <ul className={styles.ordersList}>
              {pendingOrders.length > 10 && pendingOrders.slice(10, 20).map(({_id, number}) => (
                  <li className="text text_type_digits-default mb-2" key={_id}>{number}</li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-15">
        <p className="text text_type_main-medium">
          Выполнено за все время:
        </p>
        <p className={`${styles.totalValue} text text_type_digits-large`}>
          {total}
        </p>
      </div>
      <div className="mt-15">
        <p className="text text_type_main-medium">
          Выполнено за сегодня:
        </p>
        <p className={`${styles.totalValue} text text_type_digits-large`}>
          {totalToday}
        </p>
      </div>
    </>
  );
};

export default OrdersSummary;