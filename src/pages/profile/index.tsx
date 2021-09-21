import styles from './styles.module.css';
import {Link, NavLink, Redirect, Route, Switch} from 'react-router-dom';
import {Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {getCookie} from '../../utils';
import {getUserFetch, logoutUserFetch, updateUserFetch} from '../../services/actions/user';
import React, {FC, useEffect, useState} from 'react';
import {ETokenVariant} from '../../types/enums';
import {TUserForm} from '../../services/api';
import {useDispatch, useSelector} from '../../services/hooks';
import OrdersList from '../../components/orders-list';

const ProfilePage: FC = () => {
  const dispatch = useDispatch();
  const {data: userData} = useSelector(store => store.user);
  const {isFetched: isLogoutFetched} = useSelector(store => store.user.logout);
  const refreshToken = getCookie(ETokenVariant.RefreshToken);

  const [form, setForm] = useState<TUserForm>({
    email: '',
    name: '',
    password: '',
  });

  const [canSave, setCanSave] = useState<boolean>(false);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({...form, [event.target.name]: event.target.value});

    setCanSave(true);
  };

  const onLogout = (event: React.MouseEvent) => {
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
      email: userData!.email,
      name: userData!.name,
      password: '',
    });

    setCanSave(false);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    dispatch(updateUserFetch(form));
    setCanSave(false);
  };

  if (isLogoutFetched) {
    return <Redirect to="/login"/>;
  }

  return (
    <div className={styles.content}>
      <div className={`${styles.sidebar} pt-30`}>
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
        <Switch>
          <Route path="/profile" exact>
            <p className={`${styles.notice} text text_type_main-default mt-20`}>В этом разделе вы можете изменить свои
              персональные данные</p>
          </Route>
          <Route path="/profile/orders">
            <p className={`${styles.notice} text text_type_main-default mt-20`}>В этом разделе вы можете просмотреть
              свою историю заказов</p>
          </Route>
        </Switch>
      </div>
      <div className={styles.details}>
        <Switch>
          <Route path="/profile" exact>
            <div className='pt-30'>
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
            </div>
          </Route>
          <Route path="/profile/orders">
            <div className={`${styles.ordersListContainer} pt-10`}>
              <OrdersList mode="profile"/>
            </div>
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default ProfilePage;