import styles from './styles.module.css';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';

const NotFoundPage = () => {
  return (
    <div className="pt-30">
      <div className={styles.content}>
        <h1 className={`${styles.title} text text_type_main-large mb-8`}>Такой страницы не&nbsp;найдено</h1>
        <Button>
          Перейти на главную
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;