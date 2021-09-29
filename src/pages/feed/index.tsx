import React, {useEffect} from 'react';
import styles from './styles.module.css';
import OrdersSummary from '../../components/orders-summary';
import OrdersList from '../../components/orders-list';
import {useDispatch, useSelector} from '../../services/hooks';
import {wsAllOrdersConnectionClosed, wsAllOrdersConnectionStart} from '../../services/actions/wsAllOrdersActions';

const FeedPage = () => {
  const dispatch = useDispatch();

  const {wsConnected} = useSelector(store => store.wsAllOrders);

  useEffect(() => {
    dispatch(wsAllOrdersConnectionStart());

    return () => {
      dispatch(wsAllOrdersConnectionClosed());
    }
  }, [dispatch])

  return (
    <>
      <header className="pt-10 pb-5">
        <h1 className="text text_type_main-large">Лента заказов</h1>
      </header>
      {wsConnected && (
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
      )}
    </>
  );
};

export default FeedPage;