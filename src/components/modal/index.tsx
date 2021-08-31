import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './styles.module.css';
import PropTypes from 'prop-types';
import ModalOverlay from '../modal-overlay';

const Modal = (props: any) => {
  const {children, title, onClose} = props;

  return (
    <ModalOverlay onClose={onClose}>
      <div className={`${styles.root} pt-10 pr-10 pb-15 pl-10`}>
        <header className={styles.header}>
          {title && (
            <h2 className='text text_type_main-large pr-15'>{title}</h2>
          )}
          <div className={styles.close} onClick={onClose}>
            <CloseIcon type='primary'/>
          </div>
        </header>
        {children}
      </div>
    </ModalOverlay>
  )
}

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;