import styles from './burger-ingredients.module.css';
import {useState} from 'react';
import {Counter, CurrencyIcon, Tab} from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerIngredients = ({data}) => {
  const [tab, setTab] = useState('bun');

  const buns = data.filter(item => item.type === 'bun');
  const sauces = data.filter(item => item.type === 'sauce');
  const main = data.filter(item => item.type === 'main');

  return (
    <div className={styles.root}>
      <div className={`${styles.tabs} mb-10`}>
        <Tab value='bun' active={tab === 'bun'} onClick={setTab}>
          Булки
        </Tab>
        <Tab value='sauce' active={tab === 'sauce'} onClick={setTab}>
          Соусы
        </Tab>
        <Tab value='main' active={tab === 'main'} onClick={setTab}>
          Начинки
        </Tab>
      </div>
      <div className={styles.content}>
        <section className='pb-10'>
          <h2 className="text text_type_main-medium mb-6">Булки</h2>
          <div className={`${styles.cards} pl-4 pr-4`}>
            {buns.map(({_id, name, image, price}) => (
              <div key={_id}>
                <div className={styles.card}>
                  <Counter count={1} size='default' />
                  <div className='pl-4 pr-4 mb-1'>
                    <img className={styles.cardPic} src={image} alt={name}/>
                  </div>
                  <p className={`${styles.cardPrice} text text_type_digits-default mb-1`}>
                    {price}
                    <CurrencyIcon type='primary'/>
                  </p>
                  <p className='text text_type_main-default pb-6'>{name}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className='pb-10'>
          <h2 className="text text_type_main-medium mb-6">Соусы</h2>
          <div className={`${styles.cards} pl-4 pr-4`}>
            {sauces.map(({_id, name, image, price}) => (
              <div key={_id}>
                <div className={styles.card}>
                  <Counter count={1} size='default' />
                  <div className='pl-4 pr-4 mb-1'>
                    <img className={styles.cardPic} src={image} alt={name}/>
                  </div>
                  <p className={`${styles.cardPrice} text text_type_digits-default mb-1`}>
                    {price}
                    <CurrencyIcon type='primary'/>
                  </p>
                  <p className='text text_type_main-default pb-6'>{name}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className='pb-10'>
          <h2 className="text text_type_main-medium mb-6">Начинка</h2>
          <div className={`${styles.cards} pl-4 pr-4`}>
            {main.map(({_id, name, image, price}) => (
              <div key={_id}>
                <div className={styles.card}>
                  <Counter count={1} size='default' />
                  <div className='pl-4 pr-4 mb-1'>
                    <img className={styles.cardPic} src={image} alt={name}/>
                  </div>
                  <p className={`${styles.cardPrice} text text_type_digits-default mb-1`}>
                    {price}
                    <CurrencyIcon type='primary'/>
                  </p>
                  <p className='text text_type_main-default pb-6'>{name}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default BurgerIngredients;