import styles from './styles.module.css';
import {Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link} from 'react-router-dom';

const RegisterPage = () => {
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <form className="mb-20">
          <h3 className="text text_type_main-medium mb-6">Регистрация</h3>
          <div className={`${styles.inputWrapper} mb-6`}>
            <Input
              type="text"
              placeholder="Имя"
              size="default"
              value=""
              onChange={() => {
              }}
            />
          </div>
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