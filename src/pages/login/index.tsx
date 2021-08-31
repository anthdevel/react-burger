import styles from './styles.module.css';
import {Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, Redirect, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import {loginUserFetch} from '../../services/actions/user';
import {hasToken} from '../../utils';

const LoginPage = () => {
  const dispatch = useDispatch();
  const {state} = useLocation<any>();
  const {isLoggedIn} = useSelector((store: any) => store.user);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const onChange = (event: any) => {
    setForm({...form, [event.target.name]: event.target.value});
  };

  const onSubmit = (event: any) => {
    event.preventDefault();

    dispatch(loginUserFetch(form));
  };

  if (hasToken() || isLoggedIn) {
    return <Redirect to={state?.from || '/'}/>;
  }

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <form className="mb-20" onSubmit={onSubmit}>
          <h3 className="text text_type_main-medium mb-6">Вход</h3>
          <div className={`${styles.inputWrapper} mb-6`}>
            <Input
              name="email"
              type="email"
              placeholder="E-mail"
              value={form.email}
              onChange={onChange}
            />
          </div>
          <div className={`${styles.inputWrapper} mb-6`}>
            <PasswordInput
              name="password"
              value={form.password}
              onChange={onChange}
            />
          </div>
          <Button>
            Войти
          </Button>
        </form>
        <p className="text text_type_main-default text_color_inactive mb-4">
          Вы&nbsp;&mdash; новый пользователь?
          {' '}
          <Link to="/register" className={styles.link}>Зарегистрироваться</Link>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?
          {' '}
          <Link to="/forgot-password" className={styles.link}>Восстановить пароль</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;