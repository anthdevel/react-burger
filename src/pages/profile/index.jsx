import styles from './styles.module.css';
import {NavLink, Route, Switch} from 'react-router-dom';
import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';

const ProfilePage = () => {
  return (
    <div className="pt-30">
      <div className={styles.row}>
        <div className={styles.col}>
          <ul className={styles.nav}>
            <li className={styles.navItem}>
              <NavLink exact to="/profile" className={`${styles.link} text text_type_main-medium`}
                       activeClassName={styles.active}>
                Профиль
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink exact to="/profile/orders" className={`${styles.link} text text_type_main-medium`}
                       activeClassName={styles.active}>
                История заказов
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink to="/" className={`${styles.link} text text_type_main-medium`}>
                Выход
              </NavLink>
            </li>
          </ul>
        </div>
        <div className={styles.col}>
          <Switch>
            <Route path="/profile" exact>
              <div className={`${styles.inputWrapper} mb-6`}>
                <Input
                  type="text"
                  placeholder="Имя"
                  size="default"
                  value="Марк"
                  name="name"
                  icon="EditIcon"
                  onChange={() => {
                  }}
                />
              </div>
              <div className={`${styles.inputWrapper} mb-6`}>
                <Input
                  type="email"
                  placeholder="Логин"
                  size="default"
                  value="mail@stellar.burgers"
                  name="email"
                  icon="EditIcon"
                  onChange={() => {
                  }}
                />
              </div>
              <div className={`${styles.inputWrapper} mb-6`}>
                <Input
                  type="password"
                  placeholder="Пароль"
                  size="default"
                  value=""
                  name="password"
                  icon="CloseIcon"
                  onChange={() => {
                  }}
                />
              </div>
            </Route>
            <Route path="/profile/orders" exact>
              <p className="text text_type_main-default">В этом разделе будет храниться история заказов</p>
            </Route>
          </Switch>
        </div>
      </div>
      <Switch>
        <Route path="/profile" exact>
          <div className={styles.row}>
            <div className={styles.col}>
              <p className={`${styles.notice} text text_type_main-default`}>В этом разделе вы можете изменить свои
                персональные данные</p>
            </div>
            <div className={styles.col}>
              <div className={styles.buttonGroup}>
                <Button type="secondary">
                  Отмена
                </Button>
                <Button type="primary" onClick={() => {
                }}>
                  Сохранить
                </Button>
              </div>
            </div>
          </div>
        </Route>
      </Switch>
    </div>
  );
};

export default ProfilePage;