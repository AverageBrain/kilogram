import React from 'react';
import { Button } from 'antd';
import './ModalFooter.css'

type Props = {
  handleBack: () => void;
  handleSave: () => void;
}

export const ModalFooter: React.FC<Props> = ({ handleBack, handleSave }) => {
  return (
    <footer>
      <Button className="modal-button" type="text" size="large" onClick={handleBack}>
        Отменить
      </Button>
      <Button className="modal-button" type="text" size="large" onClick={handleSave}>
        Сохранить
      </Button>
    </footer>
  );
}
