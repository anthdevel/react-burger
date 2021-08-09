import styles from './styles.module.css';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {useHistory} from 'react-router-dom';

const NotFoundPage = () => {
  const history = useHistory();

  return (
    <div className="pt-30">
      <div className={styles.content}>
        <h1 className={`${styles.title} text text_type_main-large mb-8`}>Такой страницы не&nbsp;найдено</h1>
        <Button onClick={() => history.push('/')}>
          Перейти на главную
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;