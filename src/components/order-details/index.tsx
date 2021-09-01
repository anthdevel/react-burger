import React, {FC} from 'react';
import iconDone from '../../images/icon-done.png';
import styles from './styles.module.css';

const OrderDetails: FC<{
  readonly orderNumber: number
}> = ({orderNumber}) => (
  <div className={`${styles.root} pt-4 pb-15`}>
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
  </div>
);

export default OrderDetails;