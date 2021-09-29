import styles from './styles.module.css';
import {Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, Redirect} from 'react-router-dom';
import React, {useState} from 'react';
import {resetPasswordFetch} from '../../services/actions/user';
import {hasToken} from '../../utils';
import {TResetPasswordForm} from '../../services/api';
import {useDispatch, useSelector} from '../../services/hooks';

const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const {isFetched: isResetPasswordFetched} = useSelector(store => store.user.resetPassword);
  const {isFetched: isRestorePasswordFetched} = useSelector(store => store.user.restorePassword);

  const [form, setForm] = useState<TResetPasswordForm>({
    password: '',
    token: '',
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({...form, [event.target.name]: event.target.value});
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    dispatch(resetPasswordFetch(form));
  };

  if (hasToken() || !isRestorePasswordFetched) {
    return <Redirect to="/"/>;
  } else if (isResetPasswordFetched) {
    return <Redirect to="/login"/>;
  }

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <form className="mb-20" onSubmit={onSubmit}>
          <h3 className="text text_type_main-medium mb-6">Восстановление пароля</h3>
          <div className={`${styles.inputWrapper} mb-6`}>
            <PasswordInput
              name="password"
              value={form.password}
              onChange={onChange}
            />
          </div>
          <div className={`${styles.inputWrapper} mb-6`}>
            <Input
              name="token"
              type="text"
              placeholder="Введите код из письма"
              value={form.token}
              onChange={onChange}
            />
          </div>
          <Button>Сохранить</Button>
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

export default ResetPasswordPage;