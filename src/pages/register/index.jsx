import styles from './styles.module.css';
import {Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {useState} from 'react';
import {registerUser} from '../../services/actions/user';

const RegisterPage = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onChange = (event) => {
    setUser({...user, [event.target.name]: event.target.value});
  };

  const onSubmit = (event) => {
    event.preventDefault();

    dispatch(registerUser(user));
  };

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
              size="default"
              value={user.name}
              onChange={onChange}
            />
          </div>
          <div className={`${styles.inputWrapper} mb-6`}>
            <Input
              name="email"
              type="email"
              placeholder="E-mail"
              size="default"
              value={user.email}
              onChange={onChange}
            />
          </div>
          <div className={`${styles.inputWrapper} mb-6`}>
            <PasswordInput
              name="password"
              value={user.password}
              onChange={onChange}
            />
          </div>
          <Button type="primary">
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