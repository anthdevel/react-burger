import styles from './app-header.module.css';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
  return (
    <header className={`${styles.root} pt-4 pb-4`}>
      <div className={styles.content}>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <button className={`${styles.button} ${styles.isActive}`}>
                <BurgerIcon type='secondary'/>
                <span className='text text_type_main-default text_color_inactive'>
                  Конструктор
                </span>
              </button>
            </li>
            <li className={styles.navItem}>
              <button className={styles.button}>
                <ListIcon type='secondary'/>
                <span className='text text_type_main-default text_color_inactive'>
                  Лента заказов
                </span>
              </button>
            </li>
          </ul>
        </nav>
        <Logo/>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <button className={styles.button}>
                <ProfileIcon type='secondary'/>
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