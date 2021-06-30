import styles from './app-header.module.css';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
  return (
    <header className={`${styles.root} pt-4 pb-4`}>
      <div className={`${styles.content} container`}>
        <nav className={styles.nav}>
          <ul className={styles.nav__list}>
            <li className={styles.nav__item}>
              <button className={`${styles.button} ${styles['is-active']}`}>
                <span className={`${styles.button__icon} mr-2`}>
                  <BurgerIcon type='secondary'/>
                </span>
                <span className='text text_type_main-default text_color_inactive'>
                  Конструктор
                </span>
              </button>
            </li>
            <li className={styles.nav__item}>
              <button className={styles.button}>
                <span className={`${styles.button__icon} mr-2`}>
                  <ListIcon type='secondary'/>
                </span>
                <span className='text text_type_main-default text_color_inactive'>
                  Лента заказов
                </span>
              </button>
            </li>
          </ul>
        </nav>
        <Logo/>
        <nav className={styles.nav}>
          <ul className={styles.nav__list}>
            <li className={styles.nav__item}>
              <button className={styles.button}>
                <span className={`${styles.button__icon} mr-2`}>
                  <ProfileIcon type='secondary'/>
                </span>
                <span className='text text_type_main-default text_color_inactive'>
                  Личный кабинет
                </span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;