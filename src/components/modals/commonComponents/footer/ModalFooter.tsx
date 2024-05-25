import React from 'react';
import { Button } from 'antd';
import styles from './ModalFooter.module.scss'

type Props = {
  handleBack: () => void;
  handleSave: () => void;
  saveText?: string;
  backText?: string;
}

export const ModalFooter: React.FC<Props> = ({ handleBack, handleSave, saveText, backText }) => {
  return (
    <footer className={styles.footer}>
      <Button className={styles["modal-button"]} type="text" size="large" onClick={handleBack}>
        {backText ?? 'Отменить'}
      </Button>
      <Button className={styles["modal-button"]} type="text" size="large" onClick={handleSave}>
        {saveText ?? 'Сохранить'}
      </Button>
    </footer>
  );
}
