import React from 'react';
import { ArrowLeftOutlined, ArrowRightOutlined, CloseOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import styles from './ModalHeader.module.scss';

type Props = {
  title: string;
  handleBack?: () => void;
  handleClose?: () => void;
  handleContunue?: () => void;
};

export const ModalHeader: React.FC<Props> = ({ title, handleClose, handleContunue,  handleBack }) => (
    <header className={styles.header}>
      {handleBack && <div className={clsx(styles.icon, styles['back-button'])} onClick={handleBack}><ArrowLeftOutlined /></div>}
      <div className={styles['header-name']}>{title}</div>
      {handleClose && <div className={clsx(styles.icon, styles['close-button'])} onClick={handleClose}><CloseOutlined /></div>}
      {handleContunue && <div className={clsx(styles.icon, styles['close-button'])} onClick={handleContunue}><ArrowRightOutlined /></div>}
    </header>
);
