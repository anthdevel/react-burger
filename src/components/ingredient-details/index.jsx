import React from 'react'
import styles from './styles.module.css'
import {useSelector} from 'react-redux';

const IngredientDetails = () => {
  const {
    calories,
    carbohydrates,
    fat,
    image_large: image,
    name,
    proteins,
  } = useSelector(store => store.ingredients.details);

  return (
    <div className={`${styles.root} pl-15 pr-15`}>
      <img src={image} alt={name} className={`${styles.pic} mb-4`} />
      <p className='text text_type_main-medium mb-8'>{name}</p>
      <div className={`${styles.features} text text_type_main-default text_color_inactive`}>
        <div>
          <p className='text mb-2'>Калории, ккал</p>
          <p className='text text_type_digits-default'>{calories}</p>
        </div>
        <div>
          <p className='text mb-2'>Белки, г</p>
          <p className='text text_type_digits-default'>{proteins}</p>
        </div>
        <div>
          <p className='text mb-2'>Жиры, г</p>
          <p className='text text_type_digits-default'>{fat}</p>
        </div>
        <div>
          <p className='text mb-2'>Углеводы, г</p>
          <p className='text text_type_digits-default'>{carbohydrates}</p>
        </div>
      </div>
    </div>
  )
}

export default IngredientDetails;