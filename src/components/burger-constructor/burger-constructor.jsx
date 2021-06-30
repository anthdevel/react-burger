import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor.module.css';

const BurgerConstructor = ({data}) => {
  const bun = data.filter(item => item.type === 'bun')[0];
  const ingredients = data.filter(item => item.type !== 'bun');

  return (
    <div className={`${styles.root} pl-4`}>
      <div className={styles.constructor}>
        <div className={`${styles.constructorBase} mb-4`}>
          <div className={styles.constructorItem}>
            <div className={styles.constructorItemMain}>
              <ConstructorElement
                type='top'
                isLocked
                text={bun.name}
                price={bun.price}
                thumbnail={bun.image_mobile}
              />
            </div>
          </div>
        </div>
        <div className={styles.constructorList}>
          {ingredients.map(({_id, name, price, image_mobile}) => (
            <div className={styles.constructorItem} key={_id}>
              <div className={styles.constructorItemDrag}>
                <DragIcon type='primary' />
              </div>
              <div className={styles.constructorItemMain}>
                <ConstructorElement
                  text={name}
                  price={price}
                  thumbnail={image_mobile}
                />
              </div>
            </div>
          ))}
        </div>
        <div className={`${styles.constructorBase} mt-4`}>
          <div className={styles.constructorItem}>
            <div className={styles.constructorItemMain}>
              <ConstructorElement
                type='bottom'
                isLocked
                text={bun.name}
                price={bun.price}
                thumbnail={bun.image_mobile}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.summary} pt-10 pb-10 pr-4`}>
        <div className={`${styles.summaryPrice} mr-10`}>
          <span className='text text_type_digits-medium'>610</span>
          <CurrencyIcon type='primary' />
        </div>
        <Button type='primary' size='large'>
          Оформить заказ
        </Button>
      </div>
    </div>
  )
}

export default BurgerConstructor;