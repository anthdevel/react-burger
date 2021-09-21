import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {getOrderDetailsFetch} from '../../services/actions/order';
import {useDispatch} from '../../services/hooks';

const OrderPage = () => {
  const {id} = useParams<{id: string}>();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderDetailsFetch(id))
  },[dispatch, id])

  return (
    <div>Страница заказа</div>
  );
};

export default OrderPage;