import React, {useEffect} from 'react';
import styles from './styles.module.css';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot: any = document.getElementById('modals');

const ModalOverlay = (props: any) => {
  const {
    children,
    onClose
  } = props;

  const onClickOverlay = (event: any) => {
    if (event.target.classList.contains(styles.root)) {
      onClose();
    }
  }

  useEffect(() => {
    const onPressKey = (event: any) => {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', onPressKey);
    return () => {
      document.removeEventListener('keydown', onPressKey);
    }
  }, [onClose]);

  return ReactDOM.createPortal((
      <div className={styles.root} onClick={onClickOverlay}>
        {children}
      </div>
    ),
    modalRoot
  )
};

ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;