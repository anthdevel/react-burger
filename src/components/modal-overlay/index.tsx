import React, {FC, useEffect} from 'react';
import styles from './styles.module.css';
import ReactDOM from 'react-dom';

const modalRoot: HTMLElement | null = document.getElementById('modals');

interface IModalOverlayProps {
  readonly onClose: () => void
}

const ModalOverlay: FC<IModalOverlayProps> = (props) => {
  const {
    children,
    onClose
  } = props;

  const onClickOverlay = (event: React.SyntheticEvent<HTMLDivElement>) => {
    if ((event.target as HTMLDivElement).classList.contains(styles.root)) {
      onClose();
    }
  }

  useEffect(() => {
    const onPressKey = (event: KeyboardEvent) => {
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
    modalRoot!
  )
};

export default ModalOverlay;