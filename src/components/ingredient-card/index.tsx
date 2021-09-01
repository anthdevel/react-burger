import styles from './styles.module.css';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDrag} from 'react-dnd';
import {useSelector} from 'react-redux';
import {FC, useEffect, useState} from 'react';
import {IIngredient} from '../../types/model';

interface IIngredientCardProps extends IIngredient {
  onClickCard: () => void
}

const IngredientCard: FC<IIngredientCardProps> = (props) => {
  const {
    onClickCard,
    ...rest
  } = props;

  const {
    _id,
    image,
    name,
    price,
  } = rest;

  const [count, setCount] = useState<number>(0);
  const {bun, main} = useSelector((store: any) => store.design);

  useEffect(() => {
    if (bun?._id === _id) {
      setCount(2);
    } else {
      let counter = 0;

      main.forEach((item: any) => {
        if (item._id === _id) {
          counter = counter + 1;
        }
      });

      setCount(counter);
    }
  }, [bun, main, _id])

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: rest,
  });

  return (
    <div className={styles.card} onClick={onClickCard} ref={dragRef}>
      {count > 0 && <Counter count={count} size='default'/>}
      <div className='pl-4 pr-4 mb-1'>
        <img className={styles.pic} src={image} alt={name}/>
      </div>
      <p className={`${styles.price} text text_type_digits-default mb-1`}>
        {price}
        <CurrencyIcon type='primary'/>
      </p>
      <p className='text text_type_main-default pb-6'>{name}</p>
    </div>
  )
}

export default IngredientCard;