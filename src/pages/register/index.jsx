import styles from './styles.module.css';
import {Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import {registerUserFetch} from '../../services/actions/user';
import {hasToken} from '../../utils';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const {isLoggedIn} = useSelector(store => store.user);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onChange = (event) => {
    setForm({...form, [event.target.name]: event.target.value});
  };

  const onSubmit = (event) => {
    event.preventDefault();

    dispatch(registerUserFetch(form));
  };

  if (hasToken || isLoggedIn) {
    return <Redirect to="/"/>;
  }

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <form className="mb-20" onSubmit={onSubmit}>
          <h3 className="text text_type_main-medium mb-6">Регистрация</h3>
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
            Зарегистрироваться
          </Button>
        </form>
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?
          {' '}
          <Link to="/login" className={styles.link}>Войти</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;