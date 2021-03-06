import styles from './styles.module.css';
import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, Redirect} from 'react-router-dom';
import React, {FC, useState} from 'react';
import {restorePasswordFetch} from '../../services/actions/user';
import {hasToken} from '../../utils';
import {useDispatch, useSelector} from '../../services/hooks';

const ForgotPasswordPage: FC = () => {
  const dispatch = useDispatch();
  const {isFetched} = useSelector(store => store.user.restorePassword);
  const [email, setEmail] = useState<string>('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    dispatch(restorePasswordFetch(email));
  };

  if (hasToken()) {
    return <Redirect to="/"/>;
  } else if (isFetched) {
    return <Redirect to="/reset-password"/>;
  }

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <form className="mb-20" onSubmit={onSubmit}>
          <h3 className="text text_type_main-medium mb-6">Восстановление пароля</h3>
          <div className={`${styles.inputWrapper} mb-6`}>
            <Input
              name="email"
              type="email"
              placeholder="Укажите e-mail"
              value={email}
              onChange={onChange}
            />
          </div>
          <Button onClick={() => {
          }}>
            Восстановить
          </Button>
        </form>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?
          {' '}
          <Link to="/login" className={styles.link}>Войти</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;