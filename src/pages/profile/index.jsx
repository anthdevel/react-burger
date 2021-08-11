import styles from './styles.module.css';
import {Link, NavLink, Redirect, Route, Switch} from 'react-router-dom';
import {Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {getCookie} from '../../utils';
import {getUserFetch, logoutUserFetch, updateUserFetch} from '../../services/actions/user';
import {useDispatch, useSelector} from 'react-redux';
import {REFRESH_TOKEN} from '../../utils/consts';
import {useEffect, useState} from 'react';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const {data: userData} = useSelector(store => store.user);
  const {isFetched: isLogoutFetched} = useSelector(store => store.user.logout);
  const refreshToken = getCookie(REFRESH_TOKEN);

  const [form, setForm] = useState({
    email: '',
    name: '',
    password: '',
  });

  const [canSave, setCanSave] = useState(false);

  const onChange = (event) => {
    setForm({...form, [event.target.name]: event.target.value});

    setCanSave(true);
  };

  const onLogout = (event) => {
    event.preventDefault();

    dispatch(logoutUserFetch(refreshToken));
  };

  useEffect(() => {
    dispatch(getUserFetch());
  }, [dispatch]);

  useEffect(() => {
    if (userData) {
      setForm(prevState => ({
        ...prevState,
        email: userData.email,
        name: userData.name,
      }));
    }
  }, [userData]);

  const onCancel = () => {
    setForm({
      ...form,
      email: userData.email,
      name: userData.name,
      password: '',
    });

    setCanSave(false);
  }

  const onSubmit = (event) => {
    event.preventDefault();

    dispatch(updateUserFetch(form));
    setCanSave(false);
  };

  if (isLogoutFetched) {
    return <Redirect to="/login"/>;
  }

  return (
    <div className="pt-30">
      <div className={styles.content}>
        <div className={styles.sidebar}>
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

          <p className={`${styles.notice} text text_type_main-default mt-20`}>В этом разделе вы можете изменить свои
            персональные данные</p>
        </div>
        <div className={styles.details}>
          <Switch>
            <Route path="/profile" exact>
              <form className={styles.form} onSubmit={onSubmit}>
                <div className={`${styles.inputWrapper} mb-6`}>
                  <Input
                    name="name"
                    type="text"
                    placeholder="Имя"
                    value={form.name}
                    onChange={onChange}
                  />
                </div>
                <div className={`${styles.inputWrapper} mb-6`}>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Логин"
                    value={form.email}
                    onChange={onChange}
                  />
                </div>
                <div className={`${styles.inputWrapper} mb-6`}>
                  <PasswordInput
                    value={form.password}
                    name="password"
                    onChange={onChange}
                  />
                </div>
                {canSave && (
                  <div className={styles.buttonGroup}>
                    <Button type="secondary" onClick={onCancel}>
                      Отмена
                    </Button>
                    <Button>
                      Сохранить
                    </Button>
                  </div>
                )}
              </form>
            </Route>
            <Route path="/profile/orders" exact>
              <p className="text text_type_main-default">В этом разделе будет храниться история заказов</p>
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;