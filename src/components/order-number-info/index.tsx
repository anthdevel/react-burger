import React, {FC} from 'react';
import iconDone from '../../images/icon-done.png';
import styles from './styles.module.css';
import {Nullable} from '../../types/types';

interface IOrderNumberInfoProps {
  readonly orderNumber: Nullable<number>
  readonly isFetched: boolean
}

const OrderNumberInfo: FC<IOrderNumberInfoProps> = (props) => {
  const {orderNumber, isFetched} = props;

  return (
    <div className={`${styles.root} pt-4 pb-15`}>
      {!isFetched && (
        <p className="text text_type_main-medium">
          Получение информации о заказе...
        </p>
      )}

      {isFetched && orderNumber && (
        <>
          <p className={`${styles.num} text text_type_digits-large mb-8`}>
            {orderNumber}
          </p>
          <p className="text text_type_main-medium mb-15">
            идентификатор заказа
          </p>
          <img className={`${styles.icon} mb-15`} src={iconDone} alt="icon done"/>
          <p className="text text_type_main-default mb-2">
            Ваш заказ начали готовить
          </p>
          <p className="text text_type_main-default text_color_inactive">
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      )}
    </div>
  )

};

export default OrderNumberInfo;