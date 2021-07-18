import styles from './ingredient-card.module.css';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import {useDrag} from 'react-dnd';

const IngredientCard = (props) => {
  const {
    count = 0,
    onClickCard,
    ...rest
  } = props;

  const {image, name, price} = rest;

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: rest,
  });

  return (
    <div className={styles.card} onClick={onClickCard} ref={dragRef}>
      {!!count && <Counter count={count} size='default'/>}
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
  count: PropTypes.number,
  onClickCard: PropTypes.func.isRequired,
};

export default IngredientCard;