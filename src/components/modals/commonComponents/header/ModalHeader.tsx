import React from 'react';
import { ArrowLeftOutlined, CloseOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import styles from './ModalHeader.module.scss';

type Props = {
  title: string;
  toggle: () => void;
  handleBack?: () => void;
}

export const ModalHeader: React.FC<Props> = ({ title, toggle, handleBack }) => {
  return (
    <header className={styles['header']}>
      {handleBack && <div className={clsx(styles['icon'], styles['back-button'])} onClick={handleBack}><ArrowLeftOutlined /></div>}
      <div className={styles['header-name']}>{title}</div>
      <div className={clsx(styles['icon'], styles['close-button'])} onClick={toggle}><CloseOutlined /></div>
    </header>
  );
}
