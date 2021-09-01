import styles from './styles.module.css';
import {FC} from 'react';

const FeedPage: FC = () => {
  return (
    <div className="pt-30">
      <div className={styles.content}>
        <h1 className={`${styles.title} text text_type_main-large`}>Лента заказов</h1>
      </div>
    </div>
  )
}

export default FeedPage;