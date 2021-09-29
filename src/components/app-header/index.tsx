import styles from './styles.module.css';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, NavLink} from 'react-router-dom';
import {FC} from 'react';

const AppHeader: FC = () => {
  return (
    <header className={`${styles.root} pt-4 pb-4`}>
      <div className={styles.content}>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <NavLink to="/" exact className={`${styles.link} text_type_main-medium`}
                       activeClassName={styles.active}>
                <BurgerIcon type='secondary'/>
                <span className='text text_type_main-default text_color_inactive'>
                  Конструктор
                </span>
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink to="/feed" exact className={`${styles.link} text_type_main-medium`}
                       activeClassName={styles.active}>
                <ListIcon type='secondary'/>
                <span className='text text_type_main-default text_color_inactive'>
                  Лента заказов
                </span>
              </NavLink>
            </li>
          </ul>
        </nav>
        <Link to="/">
          <Logo/>
        </Link>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <NavLink className={styles.link} to="/profile" activeClassName={styles.active}>
                <ProfileIcon type='secondary'/>
                <span className='text text_type_main-default text_color_inactive'>
                  Личный кабинет
                </span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;