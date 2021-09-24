import OrdersList from '../../components/orders-list';
import React, {useEffect} from 'react';
import styles from './styles.module.css';
import {useDispatch, useSelector} from '../../services/hooks';
import {wsUserOrdersConnectionClosed, wsUserOrdersConnectionStart} from '../../services/actions/wsUserOrdersActions';

const ProfileOrdersPage = () => {
  const dispatch = useDispatch();

  const {wsConnected} = useSelector(store => store.wsUserOrders);

  useEffect(() => {
    dispatch(wsUserOrdersConnectionStart());

    return () => {
      dispatch(wsUserOrdersConnectionClosed());
    }
  }, [dispatch])

  return (
    <>
      {wsConnected && (
        <div className={`${styles.ordersListContainer} pt-10`}>
          <OrdersList mode="profile"/>
        </div>
      )}
    </>
  )
}

export default ProfileOrdersPage;