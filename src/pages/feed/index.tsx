import React, {useEffect} from 'react';
import styles from './styles.module.css';
import {useHistory, useLocation} from 'react-router-dom';
import OrderCard from '../../components/order-card';
import OrdersSummary from '../../components/orders-summary';
import {wsConnectionClosed, wsConnectionStart} from '../../services/actions/ws';
import {useDispatch, useSelector} from '../../services/hooks';

const FeedPage = () => {
  const location = useLocation();
  const {feedOrders} = useSelector(store => store.ws);
  const history = useHistory();
  const dispatch = useDispatch();

  const onClickOrder = (id: number) => {
    history.push({
      pathname: `/feed/${id}`,
      state: {background: location}
    });
  };

  // @ts-ignore
  useEffect(() => {
    dispatch(wsConnectionStart());

    return () => dispatch(wsConnectionClosed());
  }, [dispatch]);

  return (
    <>
      <header className="pt-10 pb-5">
        <h1 className="text text_type_main-large">Лента заказов</h1>
      </header>
      <div className={styles.content}>
        <div className={styles.ordersListWrapper}>
          <ul className={styles.ordersList}>
            {feedOrders.map(item => (
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