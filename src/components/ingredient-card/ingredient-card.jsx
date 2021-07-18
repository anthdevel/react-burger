import styles from './ingredient-card.module.css';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import {useDrag} from 'react-dnd';
import {useSelector} from 'react-redux';
import {useEffect, useState} from 'react';

const IngredientCard = (props) => {
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

  const [count, setCount] = useState(0);
  const {bun, main} = useSelector(store => store.design);

  useEffect(() => {
    if (bun?._id === _id) {
      setCount(2);
    } else {
      let counter = 0;

      main.forEach(item => {
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

IngredientCard.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  __v: PropTypes.number,
  onClickCard: PropTypes.func.isRequired,
};

export default IngredientCard;