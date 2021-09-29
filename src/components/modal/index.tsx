import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import React, {FC} from 'react';
import styles from './styles.module.css';
import ModalOverlay from '../modal-overlay';

interface IModalProps {
  readonly title?: string
  readonly onClose: () => void
}

const Modal: FC<IModalProps> = (props) => {
  const {children, title, onClose} = props;

  return (
    <ModalOverlay onClose={onClose}>
      <div className={`${styles.root} pt-10 pr-10 pb-15 pl-10`}>
        <header className={styles.header}>
          {title && (
            <h2 className="text text_type_main-large pr-15">{title}</h2>
          )}
          <div className={styles.close} onClick={onClose}>
            <CloseIcon type="primary"/>
          </div>
        </header>
        {children}
      </div>
    </ModalOverlay>
  );
};

export default Modal;