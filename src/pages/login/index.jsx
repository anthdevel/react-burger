import styles from './styles.module.css';
import {Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link} from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <form className="mb-20">
          <h3 className="text text_type_main-medium mb-6">Вход</h3>
          <div className={`${styles.inputWrapper} mb-6`}>
            <Input
              type="email"
              placeholder="E-mail"
              size="default"
              value=""
              onChange={() => {
              }}
            />
          </div>
          <div className={`${styles.inputWrapper} mb-6`}>
            <PasswordInput
              value=""
              name="password"
              onChange={() => {
              }}
            />
          </div>
          <Button type="primary" onClick={() => {
          }}>
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