import React from 'react';
import { Button } from 'antd';
import './ModalFooter.css'

type Props = {
  handleBack: () => void;
  handleSave: () => void;
  saveText?: string;
  backText?: string;
}

export const ModalFooter: React.FC<Props> = ({ handleBack, handleSave, saveText, backText }) => {
  return (
    <footer>
      <Button className="modal-button" type="text" size="large" onClick={handleBack}>
        {saveText ? saveText : 'Отменить'}
      </Button>
      <Button className="modal-button" type="text" size="large" onClick={handleSave}>
        {backText ? backText : 'Сохранить'}
      </Button>
    </footer>
  );
}
