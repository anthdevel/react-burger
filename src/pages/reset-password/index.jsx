import styles from './styles.module.css';
import {Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link} from 'react-router-dom';

const ResetPasswordPage = () => {
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <form className="mb-20">
          <h3 className="text text_type_main-medium mb-6">Восстановление пароля</h3>
          <div className={`${styles.inputWrapper} mb-6`}>
            <PasswordInput
              value=""
              name="password"
              onChange={() => {
              }}
            />
          </div>
          <div className={`${styles.inputWrapper} mb-6`}>
            <Input
              type="text"
              placeholder="Введите код из письма"
              size="default"
              value=""
              onChange={() => {
              }}
            />
          </div>

          <Button type="primary" onClick={() => {
          }}>
            Сохранить
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

export default ResetPasswordPage;