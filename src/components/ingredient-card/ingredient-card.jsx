import styles from './ingredient-card.module.css';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const IngredientCard = (props) => {
  const {
    image,
    name,
    price,
    count,
    onClickCard,
  } = props;

  return (
    <div className={styles.card} onClick={onClickCard}>
      <Counter count={count} size='default'/>
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
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  count: PropTypes.number,
  onClickCard: PropTypes.func.isRequired,
};

export default IngredientCard;