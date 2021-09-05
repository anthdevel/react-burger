import React, {useEffect} from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import styles from './styles.module.css';
import OrderCard from '../../components/order-card';
import {wsConnectionClosed, wsProfileConnectionStart} from '../../services/actions/ws';
import {useDispatch, useSelector} from '../../services/hooks';

const OrdersHistoryPage = () => {
  const location = useLocation();
  const {profileOrders} = useSelector(store => store.ws);
  const dispatch = useDispatch();
  const history = useHistory();

  const onClickOrder = (id: number) => {
    history.push({
      pathname: `/profile/orders/${id}`,
      state: {background: location}
    });
  };

  // @ts-ignore
  useEffect(() => {
    dispatch(wsProfileConnectionStart());
    return () => dispatch(wsConnectionClosed());
  }, [dispatch]);

  return (
    <ul className={styles.ordersList}>
      {profileOrders.map(item => (
          <li
            key={item._id}
            className={styles.ordersItem}
            onClick={() => onClickOrder(item.number)}
          >
            <OrderCard order={item} isProfile/>
          </li>
        )
      )}
    </ul>
  );
};

export default OrdersHistoryPage;