import React, { ReactNode } from 'react';
import {default as ReactModal} from 'react-modal';
import clsx from 'clsx';
import styles from './Modal.module.scss';

type Props = {
  modalType: 'big' | 'small';
  isOpenModal: boolean;
  closeModal: () => void;
  onAfterClose?: () => void;
  children: ReactNode;
}

const Modal: React.FC<Props> = ( { modalType, isOpenModal, closeModal, children, onAfterClose } ) => {
  return (
    <ReactModal 
      className={clsx(styles[modalType === 'big' ? 'big-modal' : 'small-modal'], styles['modal'])}
      overlayClassName={{
        base: styles['overlay'],
        afterOpen: styles['overlay--after-open'],
        beforeClose: styles['overlay--before-close'],
      }}
      isOpen={isOpenModal} 
      onRequestClose={closeModal}
      onAfterClose={onAfterClose}
      closeTimeoutMS={120}>
        {children}
    </ReactModal>
  );
}

export default Modal;