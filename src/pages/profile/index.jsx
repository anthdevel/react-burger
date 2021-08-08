import styles from './styles.module.css';
import {Link, NavLink, Redirect, Route, Switch} from 'react-router-dom';
import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import {getCookie} from '../../utils';
import {logoutUserFetch} from '../../services/actions/user';
import {useDispatch, useSelector} from 'react-redux';
import {REFRESH_TOKEN} from '../../utils/consts';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const {isFetched} = useSelector(store => store.user.logout);
  const refreshToken = getCookie(REFRESH_TOKEN);

  const onLogout = (event) => {
    event.preventDefault();

    dispatch(logoutUserFetch(refreshToken));
  };

  if (isFetched) {
    return <Redirect to="/login"/>;
  }

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
              <Link to="/login" onClick={onLogout} className={`${styles.link} text text_type_main-medium`}>
                Выход
              </Link>
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
                <Button onClick={() => {
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